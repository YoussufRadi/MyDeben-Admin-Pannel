import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

import { AuthenticationService } from "../services/authentication.service";
import { User } from "./../User";
import { ApiManagerService } from "../services/api-manager.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  //Property for the user
  private user: User;
  resetForm: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private fb: FormBuilder,
    private api: ApiManagerService
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      token: ["", [Validators.required]],
      password: this.fb.group(
        {
          pwd: ["", [Validators.required, Validators.minLength(8)]],
          confirmPwd: ["", [Validators.required, Validators.minLength(8)]]
        },
        { validator: this.passwordConfirming }
      )
    });
  }

  get token() {
    return this.resetForm.get("token");
  }

  get password() {
    return this.resetForm.get("password");
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("pwd").value !== c.get("confirmPwd").value) {
      return { invalid: true };
    }
  }

  public onFormSubmit() {
    if (this.resetForm.valid) {
      this.user = this.resetForm.value;
      this.api
        .reset({
          token: this.user.token,
          password: this.user.password.pwd
        })
        .then((data: any) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
