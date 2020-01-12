import { Injectable } from '@angular/core';
import {User} from '../entity/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  urlEndpoint: string = environment.endpointUrl + '/oauth/token';

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
    const credentials = btoa('cmsu' + ':' + 'cmsp');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credentials
    });

    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    return this.http.post(this.urlEndpoint, params.toString(), {headers: httpHeaders});
  }

  saveUser(accessToken: string) {
    const payload = this.getTokenData(accessToken);
    this.user = new User();
    this.user.firstName = payload.first_name;
    this.user.lastName = payload.last_name;
    this.user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  saveToken(accessToken) {
    this.token = accessToken;
    sessionStorage.setItem('token', this.token);
  }

  getTokenData(accessToken: string) {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getTokenData(this.geToken);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.getUser.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout() {
    this.token = null;
    this.user = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
