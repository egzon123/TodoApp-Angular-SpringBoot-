import { Component, OnInit } from '@angular/core';
import { User } from '../users/users.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../service/data/users-data.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id:number;
  user:any;
  role: number;
  _password: string;
  removeRole: number;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  updateRoleForm: FormGroup;
  removeRoleForm: FormGroup;
  
  constructor(
    private userService:UsersDataService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr : ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)

    this.user = new User(this.id,'','','','',null);
    this.getUserById();

    this.profileForm = this.fb.group({
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
      ]]
    });

    this.passwordForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]]
    });

    this.updateRoleForm = this.fb.group({
      role: ['', [
        Validators.required
      ]]
    });

    this.removeRoleForm = this.fb.group({
      removeRole: ['', [
        Validators.required
      ]]
    });
  }

  get name(){
    return this.profileForm.get('name');
  }

  get username(){
    return this.profileForm.get('username');
  }

  get email(){
    return this.profileForm.get('email');
  }

  get password(){
    return this.passwordForm.get('password');
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

  updateUser(){
    console.log(this.user);
    this.userService.updateUser(this.id, this.user).subscribe(
      data => {
        this.toastr.success("User successfully updated.");
        console.log(data);
        this.router.navigate(['users']);
      })
  }

  updateRole(){
    this.userService.updateRole(this.id, this.role).subscribe(
      data =>{
        this.toastr.success("Role successfully updated.");
        console.log(data)
        this.router.navigate(['users']);
      }      
    )
  }

  deleteRole(){
    this.userService.deleteRole(this.id, this.removeRole).subscribe(
      data =>{
        this.toastr.success("Role successfully updated.");
        console.log(data);
        this.router.navigate(['users']);
      }
    )
  }

  updateUserPassword(){
    console.log('password', this._password);
    this.userService.updateUserPassword(this.id, this._password).subscribe(
      data =>{
        this.toastr.success("Password updated.");
        console.log(data);
        this.router.navigate(['users']);
      }
    )
  }

  getUserById(){  
    this.userService.getUserById(this.id).subscribe(
      data => {
        console.log(data);
        this.user = data;
        console.log(this.user);
      })
  }

}
