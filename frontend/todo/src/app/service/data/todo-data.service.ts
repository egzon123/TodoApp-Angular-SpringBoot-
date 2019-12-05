import { TODO_JPA_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`);
    
  }
  retrieveAllTodosAdmin(){
    console.log("Inside todo admin api")
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/todos`);
  }
  

  deleteTodo(username, id){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodo(username, id){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo){
    return this.http.put(
          `${TODO_JPA_API_URL}/users/${username}/todos/${id}`
                , todo);
  }

  // insertTodo(todo){
  //   return this.http.post(`${TODO_JPA_API_URL}/createTodo`, todo);
  // }

  createTodo(username, todo){
    return this.http.post(
              `${TODO_JPA_API_URL}/users/${username}/todos`
                , todo);
  }

}
