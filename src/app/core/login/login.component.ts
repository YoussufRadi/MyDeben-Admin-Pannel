import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { User } from "./../User";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { ApiManagerService } from "../services/api-manager.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  private user: User;
  loginForm: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private fb: FormBuilder,
    private api: ApiManagerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],
      password: ["", [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  public onFormSubmit() {
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this.api
        .login({
          email: this.user.email,
          password: this.user.password
        })
        .then((data: any) => {
          this.authentication.login(data.token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
