import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav, '');
  }

}
