import { WelcomeDataService } from './../service/data/welcome-data.service';
import { ActivatedRoute } from '@angular/router';


import { Component, OnInit } from '@angular/core';//'./app.component';
import { USER_ROLES } from '../service/basic-authentication.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})


export class WelcomeComponent implements OnInit {

  message = 'Some Welcome Message'
  welcomeMessageFromService:string
  name = ''
  private role;
  returnedRole = '';
  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService,
    ) { 
      this.role = sessionStorage.getItem(USER_ROLES);
  }

  showAsRole(){
    if(this.role === 'ROLE_ADMIN'){ 
      this.returnedRole = 'Admin';
    }
    else if(this.role === 'ROLE_USER'){
      this.returnedRole = 'User'
    }
    return this.returnedRole;
  }


  ngOnInit(){

    this.name = this.route.snapshot.params['name'];
   
    
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
}

