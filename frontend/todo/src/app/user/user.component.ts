import { Component, OnInit } from '@angular/core';
import { User } from '../users/users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../service/data/users-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id:number
  user:User
  
  constructor(
    private userService:UsersDataService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    console.log(this.id)

    this.user = new User(this.id,'','','','',null);

  }

  saveUser(){
    if(this.id ==-1){
      this.userService.saveUser(this.user).subscribe(
        data =>{
          console.log(data)
          this.router.navigate(['users'])
        }
      )
    }
  }

}
