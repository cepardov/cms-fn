import { Injectable } from '@angular/core';
import {User} from '../entity/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  private token: string;

  constructor(
    private http: HttpClient
  ) { }

  public get getUser(): User {
    if (this.user != null) {
      return this.user;
    } else if (this.user == null && sessionStorage.getItem('user') != null) {
      this.user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this.user;
    }
    return new User();
  }

  public get geToken(): string {
    if (this.token != null) {
      return this.token;
    } else if (this.token == null && sessionStorage.getItem('token') != null) {
      this.token = sessionStorage.getItem('token');
      return this.token;
    }
    return null;
  }

  login(user: User): Observable<any> {
    const urlEndpoint = '';
    const credentials = btoa('cmsc' + ':' + '8895');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credentials
    });

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.email);
    params.set('password', user.password);
    return this.http.post(urlEndpoint, params.toString(), {headers: httpHeaders});
  }
}
