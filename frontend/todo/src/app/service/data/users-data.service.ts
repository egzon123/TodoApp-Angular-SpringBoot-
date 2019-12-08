import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../users/users.component";
import { TODO_JPA_API_URL } from "./../../app.constants";
import { TouchSequence } from "selenium-webdriver";

@Injectable({
  providedIn: "root"
})
export class UsersDataService {
  constructor(private http: HttpClient) {}

  retriveAllUsers() {
    return this.http.get<User[]>(`${TODO_JPA_API_URL}/users`);
  }

  saveUser(user) {
    return this.http.post(`${TODO_JPA_API_URL}/auth/signup`, user);
  }

  deleteUser(id) {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${id}`);
  }

  getUserById(id) {
    return this.http.get(`${TODO_JPA_API_URL}/users/${id}`, id);
  }

  updateUser(id, user) {
    return this.http.put(`${TODO_JPA_API_URL}/user/${id}/updateUser`, user);
  }

  updateRole(id, roleId) {
    return this.http.put(
      `${TODO_JPA_API_URL}/users/${id}/roles/${roleId}/updateRole`,
      roleId
    );
  }

  deleteRole(id, roleId) {
    return this.http.delete(
      `${TODO_JPA_API_URL}/users/${id}/roles/${roleId}/deleteRole`
    );
  }

  addUser(user) {
    return this.http.post(`${TODO_JPA_API_URL}/users`, user);
  }

  updateUserPassword(id, pass) {
    const body = {
      password: pass
    };
    return this.http.put(`${TODO_JPA_API_URL}/user/${id}/changePassword`, body);
  }
}
