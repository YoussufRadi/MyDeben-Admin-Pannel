import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

import { ApiManagerService } from "../../core/services/api-manager.service";

@Component({
  selector: "app-add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.css"]
})
export class AddFormComponent implements OnInit {
  editForm: FormGroup;

  @Input() values: any;
  @Output() formOutput = new EventEmitter<Object>();
  fieldImageFile: File = null;

  constructor(private fb: FormBuilder, private api: ApiManagerService) {
    console.log("constructor");
  }

  setForm() {
    if (this.editForm)
      this.editForm.setValue({
        name: this.values.name,
        description: this.values.description || "",
        price: this.values.price || 0
      });
  }
  ngOnChanges() {
    this.setForm();
  }

  ngOnInit() {
    console.log(this.values);
    this.editForm = this.fb.group(
      {
        name: ["", [Validators.required]],
        description: [""],
        price: [""]
      }
      // { validator: this.priceExists }
    );
    this.setForm();
  }

  priceExists(c: AbstractControl): { invalid: boolean } {
    if (this.values.price && c.get("price").value) {
      return { invalid: true };
    }
  }

  get name() {
    return this.editForm.get("name");
  }

  get title() {
    return this.editForm.get("title");
  }

  get description() {
    return this.editForm.get("description");
  }

  get price() {
    return this.editForm.get("price");
  }

  public onFormSubmit() {
    this.formOutput.emit(this.values);
  }

  onFileSelected($event) {
    console.log($event);
    this.fieldImageFile = <File>$event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append("file", this.fieldImageFile, this.fieldImageFile.name);
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

  // addField() {
  // }
}
