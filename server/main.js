require('dotenv').config()
var cors = require('cors')
const express = require ('express');
const path = require ('path');
const bP = require ('body-parser');
const mysql = require ('mysql');
const multer  = require('multer')

const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'images'))
    },
    filename: function (req, file, cb) {
        //console.log(JSON.stringify(file));
      //cb(null, file.fieldname + '-' + Date.now())
      cb(null, file.originalname);
    },
    fieldSize: 20 * 1024 * 1024
  })
  
var upload = multer({ storage: storage })

//console.log("DB USER : " + process.env.DB_USER);
//console.log("DB NAME : " + process.env.DB_NAME);
const whitelist = ['http://localhost:3000', 'http://localhost:4200']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const orderL = [
    'author asc',
    'author desc',
    'title asc',
    'title desc'
]

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONLIMIT
    //,debug: true
})

var makeQuery = (sql, pool)=>{
    //console.log(sql);
    
    return  (args)=>{
        let queryPromsie = new Promise((resolve, reject)=>{
            pool.getConnection((err, connection)=>{
                if(err){
                    reject(err);
                    return;
                }
                //console.log(args);
                
                connection.query(sql, args || [], (err, results)=>{
                    connection.release();
                    if(err){
                        reject(err);
                        return;
                    }
                   // console.log(">>> "+ results);
                    resolve(results); 
                })
            });
        });
        return queryPromsie;
    }
}

//const sqlFindAllFilms = "SELECT * FROM grocery_list limit ? offset ?";
//const sqlFindFilmDetail = "select title, description, release_year from film where film_id = ?";


//var findFilmDetail = makeQuery(sqlFindFilmDetail, pool);
/*findAllFilms().then((results)=>{
    console.log(results);
}).catch((error)=>{
    console.error(error);
});
*/
//app.use(cors(corsOptions));
app.use(cors());

app.post("/searchBook",bP.json(),(req,res)=>{ //cors(corsOptions)
    //console.log(req);
    //let qLimit = 50;
    //let qOffset = 0;
    //console.log(req.body);
    let qAuthor = req.body.author? `%${req.body.author}%`: null
    let qTitle = req.body.title? `%${req.body.title}%`: null
    let qOrder = orderL[parseInt(req.body.order) || 2];
    let qLimit = parseInt(req.body.limit) || 10;
    let qOffset = parseInt(req.body.offset) || 0;
    
    //let sqlFindBook = `SELECT id, concat(author_firstname, ' ', author_lastname) author , title, cover_thumbnail from books where ( author_firstname like ? or  author_lastname like ? ) or title like ? limit ? offset ?`
    let sqlFindBook = `with listing as (SELECT id, CONCAT_WS(TRIM(author_firstname), TRIM(author_lastname)) author , title, cover_thumbnail from books)
    select id, author, title, cover_thumbnail from listing where ( author like ?) or title like ? order by ${qOrder} limit ? offset ?`
    let findBook = makeQuery(sqlFindBook, pool);

    //find book count
    let sqlCountBook = `with listing as (SELECT id, CONCAT_WS(TRIM(author_firstname), TRIM(author_lastname)) author , title, cover_thumbnail from books)
    select count(id) count from listing where ( author like ?) or title like ?`
    let countBook = makeQuery(sqlCountBook, pool);
  
    //console.log(parseInt(req.query.order),'-',req.query.order,'-',qOrder);
    findBook([qAuthor,qTitle,qLimit,qOffset]).then((results)=>{
        countBook([qAuthor,qTitle,qLimit,qOffset]).then((counts)=>{
           // console.log(counts[0].count)
            res.json({sql : results , count: counts[0].count});
        }).catch((error)=>{
            console.error(error);
            res.status(404).json(error);
        });
        //res.json(results);
    }).catch((error)=>{
        console.error(error);
        res.status(404).json(error);
    });
   // res.json({result : "success"});
});

app.post("/searchBookID",bP.json(),(req,res)=>{ //cors(corsOptions)
    //console.log(req);
    let qId = parseInt(req.body.id) || 0;
    //let sqlFindBook = `SELECT id, concat(author_firstname, ' ', author_lastname) author , title, cover_thumbnail from books where ( author_firstname like ? or  author_lastname like ? ) or title like ? limit ? offset ?`
    let sqlFindBookbyID = `select id, author_firstname, author_lastname, title, cover_thumbnail from books where id = ?`
    let findBookbyID = makeQuery(sqlFindBookbyID, pool);
  
    //console.log(parseInt(req.query.id),'-',req.query.id,'-',qId);
    findBookbyID([qId]).then((results)=>{
        res.json(results);
    }).catch((error)=>{
        console.error(error);
        res.status(404).json(error);
    });
   // res.json({result : "success"});
});

app.post('/imageUpload', upload.single("img"), (req, res) =>{
    res.status(201).json({message: "upload ok!"});
  })

app.use('/images',express.static(path.join(__dirname,'images')));

PORT = process.argv[2] || process.env.APP_PORT || 3000

app.listen(PORT, ()=>{
    console.info(`Application started on port ${PORT} at ${new Date()}`);
})