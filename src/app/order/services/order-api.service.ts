import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderApiService {
  constructor(private http: HttpClient) {}

  generate = (type, ref, date) =>
    this.http
      .get("/api/store/generate/" + type + "/" + ref + "/" + date)
      .toPromise();
  currentOrders = () => this.http.get("/api/store/order/current").toPromise();
  checkedInUsers = () => this.http.get("/api/store/users").toPromise();
  allOrders = () => this.http.get("/api/store/order").toPromise();
  serve = id => this.http.get("/api/store/order/serve/" + id).toPromise();
  cancel = id => this.http.get("/api/store/order/cancel/" + id).toPromise();
}
