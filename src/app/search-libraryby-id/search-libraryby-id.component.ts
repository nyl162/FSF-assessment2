import { Component, OnInit} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../service/book.service';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-search-libraryby-id',
  templateUrl: './search-libraryby-id.component.html',
  styleUrls: ['./search-libraryby-id.component.css']
})
export class SearchLibrarybyIDComponent implements OnInit {

  tempResult: any;
  
  displayCols = ['URL', 'title' ,'author_firstname','author_lastname']

  tableData2 = new MatTableDataSource<any>();

  constructor(private bookSvc:BookService) { }

  ngOnInit() {
    this.refreshData(0);
  }

  refreshData(Fid:number){
    //console.log(this.activatedRoute.snapshot.params);
    this.bookSvc.searchBookID(Fid).subscribe((results)=>{
      //console.log(results[0]);
      this.tempResult = results.map(x=>{
        let y = {
          ...x,
          URL: `${environment.api_url}/images/${x.cover_thumbnail}`
        }
        return y;
      });
      //console.log(this.tempResult[0]);
      this.tableData2.data=this.tempResult;
      //console.log(this.tableData.data);
    });
  }

  searchDBiD(input:NgForm){
    //console.log(input.value);
    this.refreshData(input.value.id);
  }

}