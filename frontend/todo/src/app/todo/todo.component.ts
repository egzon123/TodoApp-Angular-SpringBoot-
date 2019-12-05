import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import{ BasicAuthenticationService} from './../service/basic-authentication.service'
import { Todo } from '../list-todos/list-todos.component';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number
  todo: Todo
  myForm: FormGroup;

  constructor(
    private todoService: TodoDataService,
    private authservice :BasicAuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private fb: FormBuilder
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

    this.myForm = this.fb.group({
      description: ['', [
        Validators.required,
      ]],
      date: ['', [
        Validators.required,
      ]]
    });

  }

  saveTodo() {
   
    if(this.id == -1) { //=== ==
      this.todoService.createTodo(this.authservice.getAuthenticatedUser(), this.todo)
          .subscribe (
            data => {
              this.toast.success(`Todo: ${this.todo.description} created successfuly.`);
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    } else {
      this.todoService.updateTodo(this.authservice.getAuthenticatedUser(), this.id, this.todo)
          .subscribe (
            data => {
              this.toast.success(`Todo: ${this.todo.description} updated successfuly.`);
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    }
  }

}
