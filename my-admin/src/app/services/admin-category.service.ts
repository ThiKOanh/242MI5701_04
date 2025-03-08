import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Category } from '../interfaces/category';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  constructor(private _http: HttpClient) {}

  getCategories(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/categories', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Category>),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }

  getCategory(categoryId: string): Observable<Category> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('/categories/' + categoryId, requestOptions).pipe(
      map((res) => JSON.parse(res) as Category),
      retry(3),
      catchError(this.handleError)
    );
  }

  putCategory(category: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.put<any>("/categories", JSON.stringify(category), requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Category>),
      retry(3),
      catchError(this.handleError))
  }

  postCategory(category: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json;charset=utf-8'
    );
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('/categories', JSON.stringify(category), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Category),
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteCategory(categoryId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.delete<any>("/categories/" + categoryId, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }
}