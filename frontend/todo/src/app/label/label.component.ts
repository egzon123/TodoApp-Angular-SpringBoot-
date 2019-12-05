import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'label-costum',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  constructor(){}
  selectedLabels;
  labels: any[] = [];
  labelNames = ['Uber', 'Microsoft', 'Flexigen'];

  ngOnInit() {
      this.labelNames.forEach((c, i) => {
          this.labels.push({ id: i, name: c });
      });
  }

  addTagFn(name) {
      return { name: name, tag: true };
  }

}
