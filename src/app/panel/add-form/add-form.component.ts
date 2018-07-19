import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";

@Component({
  selector: "app-add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.css"]
})
export class AddFormComponent implements OnInit {
  @Input() modalId: string;
  @Input() title: string;
  @Input() nameValue: string;
  @Input() descriptionExists: boolean;
  @Input() descriptionValue: string;
  @Input() priceExists: boolean;
  @Input() priceValue: string;
  @Input() imageExists: boolean;

  @Output() formOutput = new EventEmitter<Object>();

  fieldName = "";
  fieldDescription = "";
  fieldPrice = "";
  fieldImageFile: File = null;
  fieldImageUrl = "";

  constructor(private api: ApiManagerService) {}

  ngOnInit() {
    this.fieldName = this.nameValue;
    this.fieldDescription = this.descriptionValue;
    this.fieldPrice = this.priceValue;
  }

  onFileSelected($event) {
    console.log($event);
    this.fieldImageFile = <File>$event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append("image", this.fieldImageFile, this.fieldImageFile.name);
    this.api
      .uploadImage(fd)
      .then((data: any) => {
        console.log(data);
        // supposed to return the url of image that will be added to the form output!
      })
      .catch(err => {
        console.log(err);
      });
  }

  addField() {
    this.formOutput.emit({
      fieldName: this.fieldName,
      fieldDescription: this.fieldDescription,
      fieldPrice: this.fieldPrice,
      fieldImageUrl: this.fieldImageUrl
    });
  }
}
