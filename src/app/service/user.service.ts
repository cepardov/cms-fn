import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../entity/user";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {RoleService} from "./role.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  urlEndpoint: string = environment.endpointUrl + '/api/v1/users';

  constructor(
      private http: HttpClient,
      private router: Router,
      private role: RoleService
  ) { }

  getUsers(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page)
        .pipe(
            tap((response: any) => {
              (response.content as User[]).forEach(user => console.log(user));
            }),
            map((response: any) => {
              (response.content as User[]).map(user => {
                return user;
              });
              return response;
            }));
  }

  createUser(user: User): Observable<User> {
    return this.http.post(this.urlEndpoint, user)
        .pipe(
            map((response: any) => response.user as User),
            catchError(e => {
              if (e.status === 400) {
                return throwError(e);
              }
              if (e.error.message) {
                console.error(e.error.message);
              }
              return throwError(e);
            })
        );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${user.id}`, user)
        .pipe(
            catchError(e => {
              if (e.status === 400) {
                return throwError(e);
              }
              if (e.error.message) {
                console.error(e.error.message);
              }
              return throwError(e);
            })
        );
  }

  showUser(id): Observable<User> {
    return this.http.get<User>(`${this.urlEndpoint}/${id}`)
        .pipe(
            catchError(e => {
              if (e.status != 401 && e.error.message) {
                this.router.navigate(['/users']);
              }
              return throwError(e);
            })
        );
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.urlEndpoint}/${id}`)
        .pipe(
            catchError(e => {
              if (e.error.message) {
                console.error(e.error.message);
              }
              return throwError(e);
            })
        );
  }
}
