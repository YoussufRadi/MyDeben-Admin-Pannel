import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.css"]
})
export class AddFormComponent implements OnInit {
  @Input() title: string;
  @Input() imageExists: boolean;
  @Input() descriptionExists: boolean;
  @Input() priceExists: boolean;

  @Output() nameEvent = new EventEmitter<string>();
  @Output() descriptionEvent = new EventEmitter<string>();
  @Output() priceEvent = new EventEmitter<string>();

  fieldName = "";
  fieldDescription = "";
  fieldPrice = "";

  constructor() {}

  ngOnInit() {}

  addField() {
    this.nameEvent.emit(this.fieldName);
    this.descriptionEvent.emit(this.fieldDescription);
    this.priceEvent.emit(this.fieldPrice);
  }
}
