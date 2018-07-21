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

  getProvidersByService() {
    return this.http
      .get("/api/store/provider/all?group=service_name")
      .toPromise();
  }

  getService() {
    return this.http.get("/api/store/service").toPromise();
  }

  addAService(data) {
    return this.http.post("/api/store/service", data).toPromise();
  }

  editService(id, data) {
    return this.http.patch("/api/store/service/" + id, data).toPromise();
  }

  deleteService(id) {
    return this.http.delete("/api/store/service/" + id).toPromise();
  }

  getProvider(id) {
    return this.http.get("/api/store/provider?serviceId=" + id).toPromise();
  }

  getCategory(id) {
    return this.http.get("/api/store/category?providerId=" + id).toPromise();
  }

  addCategory(data) {
    return this.http.post("/api/store/category", data).toPromise();
  }

  editCategory(id, data) {
    return this.http.patch("/api/store/category/" + id, data).toPromise();
  }

  deleteCategory(id) {
    return this.http.delete("/api/store/category/" + id).toPromise();
  }

  getProduct(id) {
    return this.http.get("/api/store/product?categoryId=" + id).toPromise();
  }

  addProduct(data) {
    return this.http.post("/api/store/product", data).toPromise();
  }

  editProduct(id, data) {
    return this.http.patch("/api/store/product/" + id, data).toPromise();
  }

  deleteProduct(id) {
    return this.http.delete("/api/store/product/" + id).toPromise();
  }
}
