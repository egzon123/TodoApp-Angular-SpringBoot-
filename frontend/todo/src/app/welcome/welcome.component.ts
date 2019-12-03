import { WelcomeDataService } from './../service/data/welcome-data.service';
import { ActivatedRoute } from '@angular/router';


import { Component, OnInit } from '@angular/core';//'./app.component';
import { USER_ROLES, BasicAuthenticationService } from '../service/basic-authentication.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {

  fullName: string;
  isAdmin: boolean;
  welcomeMessageFromService:string
  name = ''
  roleAdmin: string = "an Admin";
  roleUser: string = "a User";
  state: boolean = false;
  private role;
  returnedRole = '';
  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService,
    private authService:BasicAuthenticationService
    ) { 
  
  }

  showAsRole(): string{
    if(this.role === 'ROLE_ADMIN'){ 
      return 'an Admin';
    }
    return 'a User';
  }


  ngOnInit(){

    this.name = this.route.snapshot.params['name'];
    this.role = sessionStorage.getItem(USER_ROLES);
    this.name = this.splitFullName();
  }

  ngDoCheck() {
    //this.isUserLoggedIn = this.hardcodedAuthenticationService.isUserLoggedIn();
    this.fullName = this.authService.getAuthenticatedUserFullName()
    let userRoles = this.authService.getAuthenticatedUserRoles()
    if(userRoles != null){
      this.isAdmin = userRoles.includes("ROLE_ADMIN")
    }
  }

  splitFullName(): string{
    let fullName: string = sessionStorage.getItem("fullName");
    let firstName: string[] = fullName.split(" ");
    return firstName[0];
  }

  getWelcomeMessage() {
    //console.log(this.service.executeHelloWorldBeanService());
    
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

  }

  getWelcomeMessageWithParameter() {
    //console.log(this.service.executeHelloWorldBeanService());
    
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

  }


  handleSuccessfulResponse(response){
    this.welcomeMessageFromService = response.message
    console.log(response);
    //console.log(response.message);
  }

  handleErrorResponse(error) {
    console.log(error);
 
    this.welcomeMessageFromService = error.error.message
  }

  changeStateName(): string{
    if(this.changeState()){
      return "DONE";
    }
    return "DOING";
  }

  changeState(): boolean{
    return this.state = !this.state;
  }
}

