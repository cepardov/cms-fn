import {Component, Input, OnInit} from '@angular/core';
import * as M from 'materialize-css';
import {User} from '../../../entity/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service';
import {UserComponent} from '../user.component';

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
    private activatedRoute: ActivatedRoute,
    private userComponent: UserComponent
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
          // this.router.navigate(['/users']);
          this.userComponent.loadUsers();
          M.toast({
            displayLength: '5000',
            html: '<i class="material-icons icon green-text">info</i>&nbsp;Usuario creado'
          });
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
          // tslint:disable-next-line:no-shadowed-variable
          for (const err of this.errores) {
            M.toast({
              displayLength: '5000',
              html: '<i class="material-icons icon red-text">error</i>&nbsp;' + err
            });
          }
        }
      );
  }

  update(): void {
    this.userService.updateUser(this.user)
      .subscribe(
        json => {
          // this.router.navigate(['/users']);
          this.userComponent.loadUsers();
          M.toast({
            displayLength: '5000',
            html: '<i class="material-icons icon green-text">info</i>&nbsp;Usuario modificado'
          });
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

}
