import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import{ BasicAuthenticationService} from './../service/basic-authentication.service'
import { Todo } from '../list-todos/list-todos.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo

  constructor(
    private todoService: TodoDataService,
    private authservice :BasicAuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    
    this.todo = new Todo(this.id,'',false,new Date(),'');
    
    if(this.id!=-1) {
      this.todoService.retrieveTodo(this.authservice.getAuthenticatedUser(), this.id)
          .subscribe (
            data => this.todo = data
          )
    }
  }

  saveTodo() {
   
    if(this.id == -1) { //=== ==
      this.todoService.createTodo(this.authservice.getAuthenticatedUser(), this.todo)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    } else {
      this.todoService.updateTodo(this.authservice.getAuthenticatedUser(), this.id, this.todo)
          .subscribe (
            data => {
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    }
  }

}
