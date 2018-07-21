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

  constructor(private fb: FormBuilder, private api: ApiManagerService) {}

  setForm() {
    if (this.editForm)
      this.editForm.setValue({
        name: this.values.name,
        description: this.values.description || "",
        price: this.values.price || null
      });
  }

  ngOnChanges() {
    this.setForm();
  }

  ngOnInit() {
    this.editForm = this.fb.group(
      {
        name: ["", [Validators.required]],
        description: [""],
        price: [""]
      },
      { validator: this.priceExists }
    );
    this.setForm();
  }

  priceExists(c: AbstractControl): { invalid: boolean } {
    if (c.get("price").value !== null && c.get("price").value < 1) {
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

  submit() {
    const data = { ...this.editForm.value, picture: this.values.picture };
    console.log(data);
    this.formOutput.emit(data);
  }

  upload = "";

  onFileSelected($event) {
    const file = <File>$event.target.files[0];
    if (file.type === "image/png" || file.type === "image/jpeg") {
      this.fieldImageFile = <File>$event.target.files[0];
      this.values.picture = " ";
      this.upload = "Click to Uplaod";
    } else alert("Please Select JPEG or PNG Images Only");
  }

  onUpload() {
    const fd = new FormData();
    fd.append("file", this.fieldImageFile, this.fieldImageFile.name);
    this.api
      .uploadImage(fd)
      .then((data: any) => {
        this.values.picture = data.url;
        this.upload = "";
      })
      .catch(err => {
        console.log(err);
        alert(err.error.detail);
      });
  }
}
