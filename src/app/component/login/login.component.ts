import { Component, OnInit } from '@angular/core';
import {User} from "../../entity/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor() {
    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    console.log(this.user);
    if (this.user.email == null || this.user.password == null) {
      console.log('Email o contraseña vacio.')
      return;
    }
  }

}
