import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, '');
  }

}
