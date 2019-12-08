import { HardcodedAuthenticationService } from './../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from './../service/basic-authentication.service';
import { Component, OnInit } from '@angular/core';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  //isUserLoggedIn: boolean = false;
  fullName:String;
  isAdmin:boolean;
  constructor(private hardcodedAuthenticationService 
    : HardcodedAuthenticationService, private authService:BasicAuthenticationService) { }

    ngOnInit(){

    }

    ngDoCheck() {
    //this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn();
    this.fullName = this.authService.getAuthenticatedUserFullName()
    let userRoles = this.authService.getAuthenticatedUserRoles()
    if(userRoles != null){
      this.isAdmin = userRoles.includes("ROLE_ADMIN")
    }
  }

}
