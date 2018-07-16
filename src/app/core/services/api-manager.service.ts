import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiManagerService {
  constructor(private http: HttpClient) {}

  register(data) {
    return this.http.post("/api/auth/store/signup", data).toPromise();
  }

  login(data) {
    return this.http.post("/api/auth/store/signin", data).toPromise();
  }

  reset(data) {
    return this.http.post("/api/auth/reset", data).toPromise();
  }

  forget(data) {
    return this.http.post("/api/auth/forget/store", data).toPromise();
  }

  getServices(){
    return this.http.get('/api/store/service').toPromise();
  }

  getProvidersByService(){
    return this.http.get('/api/store/provider/all?group=service_name').toPromise();
  }
}
