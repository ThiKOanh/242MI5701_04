import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Order } from '../interfaces/order';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private _http: HttpClient) { }

  getOrders(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>('/orders', requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Order>),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  searchUncompletedOrder(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>('/orders', requestOptions).pipe(
      map(res => {
        const jsonData = JSON.parse(res);
        return jsonData.filter((x: { Status: any; }) => x.Status === "Chờ xác nhận");
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  deleteOrder(_id: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.delete<any>('/orders/' + _id, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Order>),
      retry(3),
      catchError(this.handleError)
    );
  }

  getOrderDetail(_id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>('/orders/' + _id, requestOptions).pipe(
      map(res => JSON.parse(res) as Order),
      retry(3),
      catchError(this.handleError)
    );
  }

  getOrderConfirm(_id: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.put<any>('/orderConfirm/' + _id, requestOptions).pipe(
      map(res => JSON.parse(res) as Order),
      retry(3),
      catchError(this.handleError)
    );
  }

  updateOrderStatus(aOrder:any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.put<any>('/orders', JSON.stringify(aOrder), requestOptions).pipe(
      map(res => JSON.parse(res) as Order),
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
      map((res) => JSON.parse(res) as Array<Order>),
      retry(3),
      catchError(this.handleError)
    );
  }
}