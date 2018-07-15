import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthenticationService } from "../services/authentication.service";
import { User } from "./../User";
import { ApiManagerService } from "../services/api-manager.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss", "../../stylesheets/forms.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  private user: User;
  forgetForm: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private fb: FormBuilder,
    private api: ApiManagerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgetForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ]
    });
  }

  get email() {
    return this.forgetForm.get("email");
  }

  public onFormSubmit() {
    if (this.forgetForm.valid) {
      this.user = this.forgetForm.value;
      this.api
        .forget({
          email: this.user.email
        })
        .then((data: any) => {
          this.router.navigate(["reset"]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
