import { Component, OnInit } from "@angular/core";

import { User } from "./../User";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ApiManagerService } from "../services/api-manager.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  //Property for the user
  private user: User;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiManagerService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
        ]
      ],
      name: ["", [Validators.required]],
      password: this.fb.group(
        {
          pwd: ["", [Validators.required, Validators.minLength(8)]],
          confirmPwd: ["", [Validators.required, Validators.minLength(8)]]
        },
        { validator: this.passwordConfirming }
      )
    });
  }

  get email() {
    return this.signupForm.get("email");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get name() {
    return this.signupForm.get("name");
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get("pwd").value !== c.get("confirmPwd").value) {
      return { invalid: true };
    }
  }

  public onFormSubmit() {
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
      this.api
        .register({
          email: this.user.email,
          name: this.user.name,
          password: this.user.password.pwd
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
