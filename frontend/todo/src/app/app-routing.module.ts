import { TodoComponent } from './todo/todo.component';
import { RouteGuardService } from './service/route-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { CompletedComponent } from './completed/completed.component';
import { OthersComponent } from './others/others.component';
import { AddUsersComponent } from './add-users/add-users.component';
// import { DetailsModal, NgbdDetailsModal } from './list-todos-details/modal-show-details.component';


const routes: Routes = [
  { path: '', component: LoginComponent  },//canActivate, RouteGuardService
  { path: 'login', component: LoginComponent },
  { path: 'login/:message', component: LoginComponent },
  { path: 'signup', component: UserRegisterComponent },
  { path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  { path: 'todos', component: ListTodosComponent, canActivate:[RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: 'todos/:id', component: TodoComponent, canActivate:[RouteGuardService] },
  { path: 'users', component: UsersComponent, canActivate:[RouteGuardService] },
  { path: 'users/:id', component: UserComponent, canActivate:[RouteGuardService] },
  { path: 'upcoming', component: UpcomingComponent, canActivate:[RouteGuardService] },
  { path: 'completed', component: CompletedComponent, canActivate:[RouteGuardService] },
  { path: 'others', component: OthersComponent, canActivate:[RouteGuardService] },
  { path: 'addUsers', component: AddUsersComponent, canActivate:[RouteGuardService] },
  { path: '**', component: ErrorComponent }
  // { path: 'list-todos-details', component: DetailsModal },
  // { path: 'login/:message', component: NgbdDetailsModal }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
