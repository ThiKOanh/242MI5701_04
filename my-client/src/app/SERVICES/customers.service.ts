import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Customers, Delivery } from '../Interfaces/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private _http: HttpClient) { }
  getCustomers(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/customers', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Customers>),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
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
  
  getDelivery(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/delivery/', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Delivery>),
      retry(3),
      catchError(this.handleError)
    );
  }

  postCustomer(customer: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('/customers', customer, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Customers>),
        retry(3),
        catchError(this.handleError)
      );
  }

}
