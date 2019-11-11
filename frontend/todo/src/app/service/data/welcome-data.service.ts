import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message:string){ }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');

  }


  executeHelloWorldServiceWithPathVariable(name) {
 
    return this.http.get<String>(
      `http://localhost:8080/api/test/admin`,
      //{headers}
      );
    //console.log("Execute Hello World Bean Service")
  }

}
