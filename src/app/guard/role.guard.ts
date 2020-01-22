import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';
import * as M from 'materialize-css';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const role = next.data.role as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    M.toast({
      displayLength: '5000',
      html: `<i class="material-icons icon red-text">error</i>&nbsp;${this.authService.getUser.firstName} no tienes acceso a este recurso.`
    });
    this.router.navigate(['/clientes']);
    return false;
  }

}
