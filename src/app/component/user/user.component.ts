import { Component, OnInit } from '@angular/core';
import {User} from "../../entity/user";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  paginator: any;

  constructor(
      private userService: UserService,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      this.userService.getUsers(page).subscribe(response => {
        this.users = response.content as User[];
        this.paginator = response;
      });
    });
  }

}
