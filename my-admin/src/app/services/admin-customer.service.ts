import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomerService {
  static getCustomerDetail(_id: any): any {
    throw new Error('Method not implemented.');
  }

  constructor(private _http:HttpClient) { }
  getCustomers():Observable<any>
  {
    const headers = new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>('/customers',requestOptions).pipe(
      map(res=>JSON.parse(res)as Array<Customer>),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

  getCustomerDetail(_id:any):Observable<any>
  {
    const headers = new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>('/customer/'+_id,requestOptions).pipe(
      map(res=>JSON.parse(res)as Customer),
      retry(3),
      catchError(this.handleError)
    )
  }
}
