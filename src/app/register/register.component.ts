import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  name: string = "";
  password: string = "";

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.email);
    console.log(this.name);
    console.log(this.password);
    this.api.register({
      "email" : this.email,
      "name" : this.name,
      "password" : this.password
    }).then(data => {
      console.log(data);
    }).catch(err =>{
      console.log(err)
    });
  }

}
