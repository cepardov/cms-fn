import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {UserComponent} from "./component/user/user.component";


const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: ''}},
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UserComponent },
  {path: 'users/page/:page', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
