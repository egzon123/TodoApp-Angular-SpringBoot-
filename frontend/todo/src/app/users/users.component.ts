import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../service/data/users-data.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  id: number;
 users:User[]
 message:String
 _search: string;

  constructor(
    private userService:UsersDataService,
    private authservice:BasicAuthenticationService,
    private route: ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    this.refreshUsers()
    this.id = this.route.snapshot.params['id'];
  }

  

  refreshUsers(){
    this.userService.retriveAllUsers().subscribe(
      response => {
        
        console.log(response);
        this.users = response
        
      }
    )
  }

  addUsers() {
    this.router.navigate(['addUsers'])
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

  get search(): string{
    return this._search;
   }
 
   set search(value: string){
     this._search = value;
   }
 
   filterUsers() {
     if(this.search){
       return this.users.filter((item)=>{
         const todo = item.name+' '+item.username+' '+ item.email;
         return todo.toLowerCase().includes(this.search.toLowerCase());
       })
     }else{
       return this.users;
     }
   }

}
