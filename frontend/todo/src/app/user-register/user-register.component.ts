import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  name = ''
  username = ''
  password = ''
  email = ''

  errorMessage = ''
  successfullMessage =''
  invalidRegister = false
  validRegister = false;

  constructor(  private router: Router,
    private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit() {
  }

  handleUserRegistration() {
    this.basicAuthenticationService.executeUserRegistration(this.name,this.email,this.username, this.password)
        .subscribe(
          data => {
            console.log(data)
            // this.router.navigate(['login',data])
            this.successfullMessage = 'Signed Up successfuly, please login !'
            this.invalidRegister = false 
            this.validRegister = true;     
          },
          error => {
            if(error.error != null){
              console.log(error.error)
              this.errorMessage =error.error
              this.invalidRegister = true
              this.validRegister = false;
            }
     
          }
        )
  }

}
