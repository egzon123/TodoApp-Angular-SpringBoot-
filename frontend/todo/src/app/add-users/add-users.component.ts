import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../service/data/users-data.service';
import { Route, Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  myForm: FormGroup;

  constructor(private userService: UsersDataService,
    private router: Router,
    private toast: ToastrService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]]
    });
  }

  get name(){
    return this.myForm.get('name');
  }

  get username(){
    return this.myForm.get('username');
  }

  get email(){
    return this.myForm.get('email');
  }

  get password(){
    return this.myForm.get('password');
  }

  addUser(){


    this.userService.addUser(this.myForm.value).subscribe(
      data => {
        this.toast.success(`User successfuly created.`);
        this.router.navigate(['users']);
      }
    )
  }

}
