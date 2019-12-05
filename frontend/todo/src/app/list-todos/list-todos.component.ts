import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import{ BasicAuthenticationService} from './../service/basic-authentication.service'
import { log } from 'util';
import { ToastrService } from 'ngx-toastr';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date,
    public username:String,
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  
  _search: string;
  todos: Todo[]
  message: string;
  isUserAdmin:boolean
  showAddTodo = false;

  

  constructor(
    private todoService:TodoDataService,
    private authService:BasicAuthenticationService,
    private router : Router,
    private toast: ToastrService
  ){ 

  }

  ngOnInit() {
    this.isUserAdmin = this.authService.getAuthenticatedUserRoles().includes("ROLE_ADMIN")
    console.log(this.authService.getAuthenticatedUserRoles())
    console.log(this.isUserAdmin);
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
    console.log("Refresh todos Admin")
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
        this.toast.success(`Todo with ID: ${id} was deleted!`);
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

  // createTodo(){
  //   this.todoService.insertTodo(this.todo).subscribe(
  //     data => {
  //       console.log(data);
  //       this.toggleAddTodo;
  //     }
  //     )
  // }
  
  get search(): string{
   return this._search;
  }

  set search(value: string){
    this._search = value;
  }

  filterTodos() {
    if(this.search){
      return this.todos.filter((item)=>{
        const todo = item.description+' '+item.username+' '+item.done;
        return todo.toLowerCase().includes(this.search.toLowerCase());
      })
    }else{
      return this.todos;
    }
  }

  toggleAddTodo(){
    this.showAddTodo = !this.showAddTodo;
  }
}

