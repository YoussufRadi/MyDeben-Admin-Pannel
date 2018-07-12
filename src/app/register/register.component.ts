import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { User } from './../User';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email1: string = "";
  name1: string = "";
  password1: string = "";

  //Property for the user
  private user: User;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {

    this.signupForm = this.fb.group({
      email: ['', [Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name: ['', [Validators.required]],
      password: this.fb.group({
        pwd: ['', [Validators.required,
        Validators.minLength(8)]],
        confirmPwd: ['', [Validators.required,
        Validators.minLength(8)]]
      }, {validator : this.passwordConfirming})
    })
  }

  get email() { 
    return this.signupForm.get('email'); 
  }

  get password() { 
    return this.signupForm.get('password'); 
  }

  get name() {
    return this.signupForm.get('name');
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('pwd').value !== c.get('confirmPwd').value) {
      return { invalid: true };
    }
  }


  public onFormSubmit() {
    if (this.signupForm.valid) {
      this.user = this.signupForm.value;
      console.log(this.user);
    }
  }

  register(){
    console.log(this.email1);
    console.log(this.name1);
    console.log(this.password1);
    this.api.register({
      "email" : this.email1,
      "name" : this.name1,
      "password" : this.password1
    }).then(data => {
      console.log(data);
    }).catch(err =>{
      console.log(err)
    });
  }

}
