import {Component, Input, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {User} from "../../../entity/user";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, '')
  }

}
