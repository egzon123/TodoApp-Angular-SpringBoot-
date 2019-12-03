import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { CompletedComponent } from './completed/completed.component';
import { OthersComponent } from './others/others.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { DetailsModal, NgbdDetailsModal } from './list-todos-details/modal-show-details.component';
import { AddUsersComponent } from './add-users/add-users.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent,
    UsersComponent,
    UserComponent,
    UserRegisterComponent,
    UpcomingComponent,
    CompletedComponent,
    OthersComponent,
    AddUsersComponent,
    // DetailsModal,
    // NgbdDetailsModal
    AddUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
     {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
