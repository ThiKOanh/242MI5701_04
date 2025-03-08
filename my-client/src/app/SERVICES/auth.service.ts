import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AccountCustomer } from '../Interfaces/AccountCustomer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  login(phonenumber: string, password: string) {
    const url = 'http://localhost:3000/login';
    const data = { phonenumber, password };
    return this.http.post(url, data);
  }

  logout() {
    if (sessionStorage.getItem('CurrentUser') !== null) {
      sessionStorage.removeItem('CurrentUser');
    }
  }

  setCurrentUser(user: any) {
    sessionStorage.setItem('CurrentUser', JSON.stringify(user));
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('CurrentUser')!);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  public setCookie(name: string, value: string, expireDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  public getCookie(name: string): string {
    const cookieName = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return '';
  }

  public deleteCookie(name: string): void {
    this.setCookie(name, '', -1);
  }
  private apiUrl = 'http://localhost:3000';

  async changePassword(phonenumber: string, oldPassword: string, newPassword: string): Promise<string> {
    try {
      const response = await this.http
        .put<any>(`${this.apiUrl}/change-password`, { phonenumber, oldPassword,newPassword })
        .pipe(
          catchError(error => {
            this.handleError(error);
            return throwError(error);
          })
        )
        .toPromise();
      return response.message;
    } catch (error) {
      console.error(error);
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    if (error.status === 401) {
      alert(error.error.message);
    } else {
      alert('An error occurred while changing password. Please try again later.');
    }
  }
}