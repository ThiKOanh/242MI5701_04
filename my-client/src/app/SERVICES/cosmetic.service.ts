import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Cosmetics } from '../Interfaces/Cosmetic';

@Injectable({
  providedIn: 'root'
})
export class CosmeticService {
  [x: string]: any;
  constructor(private _http: HttpClient) {}
  getCosmetics(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/cosmetics', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Cosmetics>),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getCosmetic(cosmeticId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .get<any>('/cosmetics/detail/' + cosmeticId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Cosmetics),
        retry(3),
        catchError(this.handleError)
      );
  }

  getCosmeticCategory(category: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/cosmetics/' + category, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Cosmetics>),
      retry(3),
      catchError(this.handleError)
    );
  }
  addToCart(med: any): Observable<any> {
    return this._http.post('/cart', med);
  }
  removeFromCart(medId: string): Observable<any> {
    return this._http.delete('/cart/delete/' + medId);
  }
  updateQuantityCart(med: any): Observable<any> {
    return this._http.put('/cart', med);
  }
  getCart(): Observable<any> {
    return this._http.get('/cart');
  }
}
