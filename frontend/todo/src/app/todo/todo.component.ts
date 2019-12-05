import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from './../service/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import{ BasicAuthenticationService} from './../service/basic-authentication.service'
import { Todo } from '../list-todos/list-todos.component';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LabelComponent } from '../label/label.component';
import { LabelService } from '../service/data/label-data.service';

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
    private router: Router,
    private toast: ToastrService,
    private labelService:LabelService
    
  ) { }

  ngOnInit() {
    
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    
    this.todo = new Todo(this.id,'',false,new Date(),'',null);
    
    if(this.id!=-1) {
      this.todoService.retrieveTodo(this.authservice.getAuthenticatedUser(), this.id)
          .subscribe (
            data => this.todo = data
          )
    }

    
  }

  saveTodo() {
   
    if(this.id == -1) { //=== ==

       this.todo.labels = this.labelService.getSelectedLabels();
      console.log("inside todo component:->:",this.todo )
      this.todoService.createTodo(this.authservice.getAuthenticatedUser(), this.todo)
          .subscribe (
            data => {
              this.toast.success(`Todo: ${this.todo.description} created successfuly.`);
              console.log(data)
              this.router.navigate(['todos'])
            }
          )
    } else {
      console.log(this.todo.labels)
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
