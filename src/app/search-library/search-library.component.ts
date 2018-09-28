import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../service/book.service';
import { environment } from '../../environments/environment';
import {PageEvent, MatTableDataSource, MatSort, Sort, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-search-library',
  templateUrl: './search-library.component.html',
  styleUrls: ['./search-library.component.css']
})
export class SearchLibraryComponent implements OnInit {

  @ViewChild('MatSort') sort: MatSort;
  @ViewChild('MatPaginator') paginator:MatPaginator;

  tempResult: any;
  displayCols = ['URL', 'title' ,'author']
  tableData = new MatTableDataSource<any>();

  length = 0;
  pageSize = environment.svcLimit;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  

  constructor(private bookSvc:BookService) { }

  ngOnInit() {
    this.refreshData();
  }
  ngAfterViewInit(){
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
  }

  refreshData(){
    //console.log(this.activatedRoute.snapshot.params);
    this.bookSvc.searchBook().subscribe((results)=>{
      this.tempResult = results.sql.map(x=>{
        let y = {
          ...x,
          URL: `${environment.api_url}/images/${x.cover_thumbnail}`
        }
        return y;
      });
      //console.log(this.tempResult);
      this.length = results.count;
      //console.log(this.length)
      this.tableData.data=this.tempResult;
    });
  }

  searchDB(input:NgForm){
    //console.log(input.value);
    this.bookSvc.criteria.author=input.value.author;
    this.bookSvc.criteria.title=input.value.title;
    this.refreshData();
  }

  sortData(sort: Sort) {
    let sortNumber: number;
    //console.log(sort);
    //console.log(sort.active+sort.direction);
    switch (sort.active+sort.direction){
    case 'titleasc' : sortNumber = 2;
    break;
    case 'titledesc' : sortNumber = 3;
    break;
    case 'authorasc' : sortNumber = 0;
    break;
    case 'authordesc' : sortNumber = 1;
    break;
    default: sortNumber = this.bookSvc.criteria.order;
    }
   // console.log (sortNumber);
    if(sortNumber === this.bookSvc.criteria.order){
      return;
    }
    this.bookSvc.criteria.order = sortNumber;
    this.refreshData();
  }
  paginated(pageEvent: PageEvent){
    console.log(pageEvent);
    this.bookSvc.criteria.limit=pageEvent.pageSize;
    this.bookSvc.criteria.offset=pageEvent.pageSize*pageEvent.pageIndex;
    this.refreshData();
  }
/*
  sortAuthor(){
    if(this.bookSvc.criteria.order === 0){
      this.bookSvc.criteria.order = 1;
    }else{
      this.bookSvc.criteria.order = 0;
    }
    this.refreshData();
  }

  sortTitle(){
    if(this.bookSvc.criteria.order === 2){
      this.bookSvc.criteria.order = 3;
    }else{
      this.bookSvc.criteria.order = 2;
    }
    this.refreshData();
  }
*/
  editClick(n: number){
    console.log(n);
  }
}
