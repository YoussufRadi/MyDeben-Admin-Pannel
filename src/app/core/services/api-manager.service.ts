import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiManagerService {
  constructor(private http: HttpClient) {}

  register(data) {
    console.log("service called");
    console.log(data);
    return this.http.post("/api/auth/store/signup", data).toPromise();
  }

  login(data) {
    return this.http.post("/api/auth/store/signin", data).toPromise();
  }
}
