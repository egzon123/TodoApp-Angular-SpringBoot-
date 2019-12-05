import { TODO_JPA_API_URL } from './../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
    providedIn: 'root'
  })

  export class LabelService{
      constructor(private http: HttpClient){

      }

      
  }