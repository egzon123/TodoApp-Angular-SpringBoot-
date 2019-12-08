import { API_URL } from "./../app.constants";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

export const TOKEN = "token";
export const AUTHENTICATED_USER = "authenticaterUser";
export const USER_ROLES = "userRoles";

@Injectable({
  providedIn: "root"
})
export class BasicAuthenticationService {
  userRoles: String[] = new Array();
  fullName: String = "";
  constructor(private http: HttpClient, private router: Router) {}

  executeJWTAuthenticationService(username, password) {
    return this.http
      .post<any>(`${API_URL}/api/auth/signin`, {
        username,
        password
      })
      .pipe(
        map(data => {
          let jwtData = data.accessToken.split(".")[1];
          let decodedJwtJsonData = window.atob(jwtData);
          let decodedJwtData = JSON.parse(decodedJwtJsonData);
          console.log(decodedJwtData);
          this.fullName = decodedJwtData.fullname;
          decodedJwtData.roles.forEach(element => {
            this.userRoles.push(element.authority);
          });
          console.log(decodedJwtData);
          console.log(this.fullName);
          console.log("roles----", this.userRoles);

          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.accessToken}`);
          sessionStorage.setItem(USER_ROLES, this.userRoles.toString());
          sessionStorage.setItem("fullName", this.fullName.toString());
          return data;
        })
      );
    //console.log("Execute Hello World Bean Service")
  }
  executeUserRegistration(name, email, username, password) {
    const requestOptions: Object = {
      //If your response is text not json
      responseType: "text"
    };
    return this.http
      .post<any>(
        `${API_URL}/api/auth/signup`,
        {
          name,
          email,
          username,
          password
        },
        requestOptions
      )
      .pipe(
        map((data, error) => {
          if (data) {
            return data;
          } else {
            return error;
          }
        })
      );
  }

  executeAuthenticationService(username, password) {
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    return this.http
      .get<AuthenticationBean>(`${API_URL}/basicauth`, { headers })
      .pipe(
        map(data => {
          console.log(data);
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        })
      );
    //console.log("Execute Hello World Bean Service")
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) return sessionStorage.getItem(TOKEN);
  }

  getAuthenticatedUserRoles() {
    return sessionStorage.getItem(USER_ROLES);
  }

  getAuthenticatedUserFullName() {
    return sessionStorage.getItem("fullName");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    this.userRoles.length = 0;
    sessionStorage.removeItem(USER_ROLES);
    sessionStorage.removeItem("fullName");
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
