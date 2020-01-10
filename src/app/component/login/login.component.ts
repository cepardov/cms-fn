import { Component, OnInit } from '@angular/core';
import {User} from "../../entity/user";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

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
      this.router.navigate(['/'])
      console.log('Usuario autenticado')
    }, err => {
      if (err.status === 400) {
        console.log('Usuario o clave incorrecta');
      }
    })
  }

}
