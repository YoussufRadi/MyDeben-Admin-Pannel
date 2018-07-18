import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiManagerService {
  constructor(private http: HttpClient) {}

  uploadImage(data) {
    return this.http.post("/api/file", data).toPromise();
  }

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

  getServices() {
    return this.http.get("/api/store/service").toPromise();
  }

  getProvidersByService() {
    return this.http
      .get("/api/store/provider/all?group=service_name")
      .toPromise();
  }

  addAService(data) {
    return this.http.post("/api/store/service", data).toPromise();
  }

  getProviders(id) {
    return this.http.get("/api/store/provider?serviceId=" + id).toPromise();
  }

  getCategories(id) {
    return this.http.get("/api/store/category?providerId=" + id).toPromise();
  }

  getProducts(id) {
    return this.http.get("/api/store/product?categoryId=" + id).toPromise();
  }
}
