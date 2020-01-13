import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {UserComponent} from './component/user/user.component';
import {AuthGuard} from "./guard/auth.guard";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent, data: {title: ''}},
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  {path: 'users/page/:page', component: UserComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
