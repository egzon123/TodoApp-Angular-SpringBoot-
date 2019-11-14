import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../service/data/users-data.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router } from '@angular/router';

export class User{
  constructor(
    public id:number,
    public name:String,
    public username:String,
    public email:String,
    public password:String,
    public roles:Set<String>
  ){
 
  }

  
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 users:User[]
 message:String

  constructor(
    private userService:UsersDataService,
    private authservice:BasicAuthenticationService,
    private router:Router
    ) { }

  ngOnInit() {
    this.refreshUsers()
  }

  refreshUsers(){
    this.userService.retriveAllUsers().subscribe(
      response => {
        
        console.log(response);
        this.users = response
        
      }
    )
  }

  addUser() {
    this.router.navigate(['users',-1])
  }

  deleteUser(id) {
    console.log(`delete User ${id}` )
    this.userService.deleteUser(id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of User ${id} Successful!`;
        this.refreshUsers()
        
      }
    )
  }


}
