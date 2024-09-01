import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import {
  ChangePassword,
  LoginUser,
  UserInfo,
} from '../interfaces/Base.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private router: Router
  ) {
    this.apiUrl = this.config.getApiUrl();
  }

  login(user: LoginUser): Observable<any> {
    return this.http
      .post(`${this.apiUrl}api/account/sign-in`, user)
      .pipe(tap((response) => this.setToken(response)));
  }
  setToken(response: any) {
    const expDate = new Date(response.expires * 1000);
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('token-exp', expDate.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}api/User/info`);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http
      .post(`${this.apiUrl}api/account/tokens/${refreshToken}/refresh`, null)
      .pipe(tap((response) => this.setToken(response)));
  }

  changePassword(passwords: ChangePassword): Observable<ChangePassword> {
    return this.http.post<ChangePassword>(
      `${this.apiUrl}api/user/change-password`,
      passwords
    );
  }
}
