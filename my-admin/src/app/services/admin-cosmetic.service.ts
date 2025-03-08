import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { Cosmetics } from '../interfaces/cosmetics';

@Injectable({
  providedIn: 'root'
})
export class AdminCosmeticService {
  [x: string]: any;
  constructor(private _http: HttpClient) { }
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
    return this._http.get<any>('/cosmetics/detail/' + cosmeticId, requestOptions).pipe(
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
  getCosmeticSubCategory(category: string, subcategory: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8  '
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/cosmetics/' + category + '/' + subcategory, requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Cosmetics>),
      retry(3),
      catchError(this.handleError)
    );
  }

  postCosmetic(cosmetic: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('/cosmetics', JSON.stringify(cosmetic), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Cosmetics),
        retry(3),
        catchError(this.handleError)
      );
  }

  putCosmetic(cosmetic: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.put<any>("/cosmetics", JSON.stringify(cosmetic), requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Cosmetics>),
      retry(3),
      catchError(this.handleError))
  }

  deleteCosmetic(cosmeticId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.delete<any>("/cosmetics/" + cosmeticId, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Cosmetics>),
      retry(3),
      catchError(this.handleError))
  }
}
