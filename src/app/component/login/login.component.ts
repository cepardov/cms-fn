import { Component, OnInit } from '@angular/core';
import {User} from '../../entity/user';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';
import * as M from 'materialize-css';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  validateUser: boolean;
  validatePass: boolean;

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    if (this.user.username == null) {
      this.validateUser = false;
      M.toast({
        displayLength: '5000',
        html: '<i class="material-icons icon yellow-text">warning</i>&nbsp;Ingrese su nombre de usuario'
      });
      return;
    }

    if (this.user.password == null) {
      this.validatePass = false;
      M.toast({
        displayLength: '5000',
        html: '<i class="material-icons icon yellow-text">warning</i>&nbsp;Ingrese su contraseña'
      });
      return;
    }

    this.authService.login(this.user)
      .subscribe(response => {
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      const usuario = this.authService.getUser;
      this.router.navigate(['/']);
      M.toast({
        displayLength: '5000',
        html: '<i class="material-icons icon green-textt">info</i>&nbsp;Bienvenido ' + usuario.firstName + ' ' + usuario.lastName
      });
    }, err => {
      this.user.password = null;
      this.validatePass = false;
      if (err.status === 400) {
        M.toast({
          displayLength: '5000',
          html: '<i class="material-icons icon red-text">error</i>&nbsp;Usuario o contraseña incorrectas'
        });
      }
    });
  }

}
