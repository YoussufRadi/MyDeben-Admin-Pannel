import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogService } from "ng2-bootstrap-modal";

import { OrderApiService } from "../services/order-api.service";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { CodegenComponentFactoryResolver } from "@angular/core/src/linker/component_factory_resolver";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-generate",
  templateUrl: "./generate.component.html",
  styleUrls: ["./generate.component.scss"]
})
export class GenerateComponent implements OnInit {
  generateForm: FormGroup;
  minDate = new Date();
  image;
  code;
  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private api: OrderApiService,
    private auth: AuthenticationService
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
    });
  }

  ngOnInit() {
    this.auth.setSidebarValue(0);
    this.generateForm = this.fb.group({
      ref: ["", [Validators.required]],
      date: ["", [Validators.required]]
    });
  }

  get ref() {
    return this.generateForm.get("ref");
  }

  get date() {
    return this.generateForm.get("date");
  }

  public onFormSubmit() {
    if (this.generateForm.valid) {
      const value = this.generateForm.value;
      this.api
        .generate("code", value.ref, value.date)
        .then((data: any) => {
          this.image = data.code;
        })
        .catch(err => {
          console.log(err);
          this.showError("QR Failed", err.error.detail);
        });
      this.api
        .generate("token", value.ref, value.date)
        .then((data: any) => {
          this.code = data.token;
        })
        .catch(err => {
          console.log(err);
          this.showError("Token Failed", err.error.detail);
        });
    }
  }
}
