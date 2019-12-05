import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';
import { User } from '../users/users.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user:User
  // name = ''
  // username = ''
  // password = ''
  // email = ''

  errorMessage = ''
  successfullMessage =''
  invalidRegister = false
  validRegister = false;

  constructor(  private router: Router,
    private basicAuthenticationService: BasicAuthenticationService,
    private toast: ToastrService) { }

  ngOnInit() {
    this.user = new User(0,'','','','',null);
  }
  
  onSubmit(){
    return this.validRegister;
  }

  handleUserRegistration() {
    console.log(this.onSubmit());
    this.basicAuthenticationService.executeUserRegistration(this.user.name,this.user.email,this.user.username, this.user.password)
        .subscribe(
          data => {
            console.log(data)
            // this.router.navigate(['login',data])
            this.toast.success(`User: ${this.user.name}, successfuly added.`);
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