import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User } from '../../users/users.component';
import { TODO_JPA_API_URL } from './../../app.constants';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(
    private http:HttpClient
  ) { }

  retriveAllUsers(){
    return this.http.get<User[]>(`${TODO_JPA_API_URL}/users`); 
  }

  saveUser(user){
    return this.http.post(`${TODO_JPA_API_URL}/auth/signup`,user);
  }

  deleteUser(id){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${id}`);
  }
}
