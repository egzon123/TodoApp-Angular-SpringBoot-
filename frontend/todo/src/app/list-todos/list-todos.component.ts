import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ BasicAuthenticationService} from './../service/basic-authentication.service'

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date,
    public username:String
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[]

  message: string
  isUserAdmin:boolean

  // = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Become an Expert at Angular', false, new Date()),
  //   new Todo(3, 'Visit India', false, new Date())
  //   // {id : 1, description : },
  //   // {id : 2, description : ''},
  //   // {id : 3, description : 'Visit India'}
  // ]

  // todo = {
  //     id : 1,
  //     description: 'Learn to Dance'
  // }

  constructor(
    private todoService:TodoDataService,
    private authService:BasicAuthenticationService,
    private router : Router
  ) { }

  ngOnInit() {

  
  this.isUserAdmin = this.authService.getAuthenticatedUserRoles().includes("ROLE_ADMIN")
  console.log(this.authService.getAuthenticatedUserRoles())
  console.log(this.isUserAdmin)
  if(this.isUserAdmin){
    this.refreshTodosAdmin()
  }else{
    this.refreshTodos();
  }
    
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos(this.authService.getAuthenticatedUser()).subscribe(
      response => {
        console.log(response);
        this.todos = response;
        
      }
    )
  }

  refreshTodosAdmin(){
    this.todoService.retrieveAllTodosAdmin().subscribe(
      response => {
        console.log(response);
        this.todos = response;
        
      }
    )
  }

  deleteTodo(id) {
    console.log(`delete todo ${id}` )
    this.todoService.deleteTodo(this.authService.getAuthenticatedUser(), id).subscribe (
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Successful!`;
        if(this.isUserAdmin){
          this.refreshTodosAdmin()
        }else{
          this.refreshTodos();
        }
        
      }
    )
  }

  updateTodo(id) {
    console.log(`update ${id}`)
    this.router.navigate(['todos',id])
  }

  addTodo() {
    this.router.navigate(['todos',-1])
  }
}
