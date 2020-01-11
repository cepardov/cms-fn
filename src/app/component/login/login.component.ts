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
  loginForm: NgForm;
  validate: boolean;

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      console.log('Email o contraseña vacio.')
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log('Login Response' + response);

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      const usuario = this.authService.getUser;
      console.log(usuario)
      this.router.navigate(['/'])
      M.toast({
        displayLength: '5000',
        html: '<i class="material-icons icon green-textt">info</i>&nbsp;Bienvenido '
      });
    }, err => {
      this.user.password = null;
      this.validate = false;
      if (err.status === 400) {
        M.toast({
          displayLength: '5000',
          html: '<i class="material-icons icon red-text">error</i>&nbsp;Usuario o contraseña incorrectas'
        });
        console.log('Usuario o clave incorrecta');
      }
    });
  }

}
