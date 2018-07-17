import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogService } from "ng2-bootstrap-modal";

import { OrderApiService } from "../services/order-api.service";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";

@Component({
  selector: "app-generate",
  templateUrl: "./generate.component.html",
  styleUrls: ["./generate.component.scss"]
})
export class GenerateComponent implements OnInit {
  generateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private api: OrderApiService
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
    });
  }

  ngOnInit() {
    this.generateForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  get email() {
    return this.generateForm.get("email");
  }

  get password() {
    return this.generateForm.get("password");
  }

  public onFormSubmit() {
    if (this.generateForm.valid) {
      // this.api
      //   .login({
      //     email: this.generateForm.value,
      //     password: this.generateForm.value
      //   })
      //   .then((data: any) => {
      //     console.log(data);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     this.showError("Sign In Failed", err.error.detail);
      //   });
    }
  }
}
