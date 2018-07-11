import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  register(data){
    console.log("service called");
    console.log(data);
    return this.http.post("http://172.104.209.122:3000/api/auth/user/signup", data).toPromise();
  }

  login(data){
    return this.http.post("/api/login", data);
  }

}
