import {Component, OnChanges, OnInit} from '@angular/core';
import {User} from '../../entity/user';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];
  paginator: any;
  userSelected: User;
  onCreate: boolean;

  constructor(
      private userService: UserService,
      private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
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

  delete(user: User): void {
    this.userService.deleteUser(user.id)
        .subscribe(() => {
          this.users = this.users.filter(u => u !== user);
          console.log('Usuario eliminado');
        });
  }

  showUser(user: User, onCreate: boolean) {
    this.onCreate = onCreate;
    if (user !== null) {
      user.password = null;
      this.userSelected = user;
    } else {
      this.userSelected = new User();
    }
  }

}
