import {Component, Input, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {User} from "../../../entity/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  @Input() user: User;
  passwordVerified: string;
  errores: string[];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, '');
  }

  create(): void {
    console.log(this.user);
    this.userService.createUser(this.user)
      .subscribe(
        cliente => {
          this.router.navigate(['/users']);
          console.log('Cliente creado');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    console.log('asd:' + this.user.enabled)
    this.userService.updateUser(this.user)
      .subscribe(
        json => {
          this.router.navigate(['/users']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

}
