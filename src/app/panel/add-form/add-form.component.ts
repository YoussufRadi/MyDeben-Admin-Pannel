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

  @Output() formOutput = new EventEmitter<Object>();

  fieldName = "";
  fieldDescription = "";
  fieldPrice = "";

  constructor() {}

  ngOnInit() {}

  addField() {
    this.formOutput.emit({
      fieldName: this.fieldName,
      fieldDescription: this.fieldDescription,
      fieldPrice: this.fieldPrice
    });
  }
}
