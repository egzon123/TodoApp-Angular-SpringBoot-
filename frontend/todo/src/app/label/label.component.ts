import { Component, OnInit } from '@angular/core';
import { LabelService } from '../service/data/label-data.service';
import { ActivatedRoute } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';

@Component({
  selector: 'label-costum',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  constructor(private labelService:LabelService
    ,private route:ActivatedRoute,
    private todoService:TodoDataService){}
  selectedLabels:Label[];
  labels: Label[] = [];
  todo:Todo;
  username:String;
  todoId:number;
  // labelNames = ['social', 'urgent', 'important'];
  labelNames = [
      new Label("urgent"),new Label("social"),new Label("important")
];


  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if(this.todoId != -1){
      this.username= sessionStorage.getItem(AUTHENTICATED_USER);
      console.log(this.username)
      this.todoService.retrieveTodo(this.username,this.todoId) .subscribe (
       data => this.selectedLabels = data.labels
     
     );
     console.log("inside label component->>",this.todo)
    //  this.selectedLabels= this.todo.labels;
    }
    
   
    console.log("inside LabelComponent: ",this.todoId)
      this.labelNames.forEach((c, i) => {
          this.labels.push(new Label(c.toString()));
      });
  }

  addTagFn(Label) {
      return { name: Label };
  }
 
  getSelectedLabels(){
    return this.selectedLabels;
  }
  ngDoCheck(){
    this.labelService.setSelectedLabels(this.selectedLabels)
  }

  
}

export class Label{
  constructor(
    public name:String

  ){

  }
}
