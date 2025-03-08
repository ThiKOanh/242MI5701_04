import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Orders } from '../Interfaces/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  [x: string]: any;

  constructor(private _http:HttpClient) { }
  getOrders(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/orders', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Orders>),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getOrder(orderId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .get<any>('/orders/' + orderId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Orders),
        retry(3),
        catchError(this.handleError)
      );
  }

  getOrderCustomer(name: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/orders/customer/' + name, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Orders>),
      retry(3),
      catchError(this.handleError)
    );
  }

  postOrder(order: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('/orders', order, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Orders>),
        retry(3),
        catchError(this.handleError)
      );
  }
}
