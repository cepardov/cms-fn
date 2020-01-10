import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private  urlEndpoint: string = environment.endpointUrl + '/api/v1';

  constructor(
      private http: HttpClient
  ) { }

  getRoles(): Observable<any> {
    return this.http.get(this.urlEndpoint + '/roles')
        .pipe(
            catchError(e => {
              return throwError(e);
            })
        );
  }
}
