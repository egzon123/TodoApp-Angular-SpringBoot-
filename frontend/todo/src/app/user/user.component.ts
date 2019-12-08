import { Component, OnInit } from "@angular/core";
import { User } from "../users/users.component";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersDataService } from "../service/data/users-data.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  id: number;
  user: any;
  role: number;
  password: string;
  removeRole: number;

  constructor(
    private userService: UsersDataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);

    this.user = new User(this.id, "", "", "", "", null);
    this.getUserById();
  }

  saveUser() {
    if (this.id == -1) {
      this.userService.saveUser(this.user).subscribe(data => {
        console.log(data);
        this.router.navigate(["users"]);
      });
    }
  }

  updateUser() {
    console.log(this.user);
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      this.toastr.success("User successfully updated.");
      console.log(data);
      this.router.navigate(["users"]);
    });
  }

  updateRole() {
    this.userService.updateRole(this.id, this.role).subscribe(data => {
      this.toastr.success("Role successfully updated.");
      console.log(data);
      this.router.navigate(["users"]);
    });
  }

  deleteRole() {
    this.userService.deleteRole(this.id, this.removeRole).subscribe(data => {
      this.toastr.success("Role successfully updated.");
      console.log(data);
      this.router.navigate(["users"]);
    });
  }

  updateUserPassword() {
    console.log("password", this.password);
    this.userService
      .updateUserPassword(this.id, this.password)
      .subscribe(data => {
        this.toastr.success("Password updated.");
        console.log(data);
        this.router.navigate(["users"]);
      });
  }

  getUserById() {
    this.userService.getUserById(this.id).subscribe(data => {
      console.log(data);
      this.user = data;
      console.log(this.user);
    });
  }
}
