import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../service/book.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search-library',
  templateUrl: './search-library.component.html',
  styleUrls: ['./search-library.component.css']
})
export class SearchLibraryComponent implements OnInit {

  tempResult: any;

  constructor(private bookSvc:BookService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    //console.log(this.activatedRoute.snapshot.params);
    this.bookSvc.searchBook().subscribe((results)=>{
      this.tempResult = results.map(x=>{
        let y = {
          ...x,
          URL: `${environment.api_url}/images/${x.cover_thumbnail}`
        }
        return y;
      });
      console.log(this.tempResult);
    });
  }
}
