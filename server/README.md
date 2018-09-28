## API usage

### endpoint 1: _/searchBook_
method: POST
accept: application/json

#### input:
|name|accept|usage|
|---|---|---|
|author|string|search DB for author name in concatinated *author_lastname* or *author_firstname*|
|title|string|search DB for title name in *title*|
|limit|number|pagination: to limit the result output (default:10)|
|offset|number|pagination: to offset the result output to next page(default:0)|
|order|number|<ul><li>0 - sort by author ascending</li><li>1 - sort by author descending</li><li>2 - sort by title ascending (default)</li><li>3 - sort by title descending</li></ul>|

#### output (JSON):
|key|type|description|
|---|---|---|
|sql.id|number|unique ID of the data|
|sql.author|string|author name in concatinated *author_firstname* and *author_lastname* |
|sql.title|string| book title|
|sql.cover_thumbnail|string(URI)| images files located at _/images_ endpoint **to be append to URL on front end**|
|count|number|number of results in the query|
##### sample output
```json
{
"sql": [
  {
"id": 99,
"author": "Le Guin",
"title": "A Wizard of Earthsea",
"cover_thumbnail": "no_book_cover.jpg"
},
  {
"id": 33,
"author": "Price",
"title": "Amazon Adventure",
"cover_thumbnail": "no_book_cover.jpg"
}
],
"count": 112
}
```

### endpoint 2: _/searchBookID_
method: POST
accept: application/json

#### input:
|name|accept|usage|
|---|---|---|
|id|number|search DB for unique *id* |
* assume database peform control to provide unique id

#### output (JSON):
|key|type|description|
|---|---|---|
|id|number|unique ID of the data|
|author_firstname|string|author first name|
|author_lastname|string|author last name|
|title|string| book title|
|cover_thumbnail|string(URI)| images files located at _/images_ endpoint **to be append to URL on front end**|
##### sample output
```json
{
"id": 1,
"author_firstname": "Susannah",
"author_lastname": "Leigh",
"title": "The Haunted Tower",
"cover_thumbnail": "the_haunted_tower.jpg"
}
```

### endpoint 3: _/images_

Serve uploaded images

### endpoint 4: _/imageUpload_
method: POST

#### input:
accept: multipart/formdata
|key|type|description|
|---|---|---|
|img|{imagefile}|any image file with extension supported by the browser|

```
Upload file to /images folder retain original filename and extension.
```
#### output (JSON):
##### sample output
```json
{
"message": "upload ok!"
}
```

## Open issues
1. DB: *author_lastname* contain unclean data with "/".
2. DB: *author_firstname* might be empty.