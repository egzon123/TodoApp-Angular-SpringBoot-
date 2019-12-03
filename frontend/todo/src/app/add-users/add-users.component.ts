import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../service/data/users-data.service';
import { Route, Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  user: Object = {
    name: '',
    username: '',
    email: '',
    password: ''
  };


  constructor(private userService: UsersDataService,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit() {
  }

  addUser(){
    const user = {
      name: this.user['name'],
      username: this.user['username'],
      email: this.user['email'],
      password: this.user['password'],
    }
    console.log(user);
    this.userService.addUser(user).subscribe(
      data => {
        this.toast.success("User successfully created!");
        console.log(data);
        this.router.navigate(['users']);
      }
    )
  }

}
