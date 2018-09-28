import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
//import {AddCriteria,QueryCriteria} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  criteria : QueryCriteria = {
    name:"bp",
    brand:"",
    order:0,
    limit: environment.svcLimit,
    offset:0
  }
  constructor(private http:HttpClient) { }

  searchBook() : Observable<any>{

    console.log(this.criteria);

    return this.http.post(`${environment.api_url}/searchBook`,this.criteria)
      .pipe(
        catchError(this.handleError('searchBook', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
