import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { Cosmetics } from '../interfaces/cosmetics';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private _http: HttpClient) { }
  
  noOfEqu() {
    return this._http.get("http://localhost:3000/")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
