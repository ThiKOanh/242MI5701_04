import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Profile } from '../Interfaces/profile';
import { Customers, Delivery } from '../Interfaces/Customer';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _http: HttpClient) { }
  postCustomer(aCustomer:any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.post<any>('/customers',JSON.stringify(aCustomer), requestOptions).pipe(
      map((res) => JSON.parse(res) as Profile),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  updateCustomer(aCustomer:any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.put<any>('/customers', JSON.stringify(aCustomer), requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Customers>),
      retry(3),
      catchError(this.handleError)
    );
  }

  getCustomers():Observable<any>
  {
    const headers = new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>('/customers',requestOptions).pipe(
      map(res=>JSON.parse(res)as Array<Customers>),
      retry(3),
      catchError(this.handleError)
    )
  }

  getDelivery(phone:string):Observable<any>
  {
    const headers = new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>('/delivery/'+phone,requestOptions).pipe(
      map(res=>JSON.parse(res)as Customers),
      retry(3),
      catchError(this.handleError)
    )
  }

  postDelivery(aDelivery:any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.post<any>('/delivery',JSON.stringify(aDelivery), requestOptions).pipe(
      map((res) => JSON.parse(res) as Delivery),
      retry(3),
      catchError(this.handleError)
    );
  }

  updateDelivery(aDelivery:any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.put<any>('/delivery', JSON.stringify(aDelivery), requestOptions).pipe(
      map((res) => JSON.parse(res) as Delivery),
      retry(3),
      catchError(this.handleError)
    );
  }


  getCustomer(Phone:string):Observable<any>
  {
    const headers = new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>('/customers/'+Phone,requestOptions).pipe(
      map(res=>JSON.parse(res)as Customers),
      retry(3),
      catchError(this.handleError)
    )
  }
}