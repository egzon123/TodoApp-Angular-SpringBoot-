import { TODO_JPA_API_URL } from "./../../app.constants";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../../list-todos/list-todos.component";
import { Label } from "src/app/label/label.component";

@Injectable({
  providedIn: "root"
})
export class LabelService {
  labels: Label[];
  constructor(private http: HttpClient) {}

  setSelectedLabels(selectedLabels) {
    this.labels = selectedLabels;
    console.log("inside label service: ", this.labels);
  }

  getSelectedLabels() {
    return this.labels;
  }
}
