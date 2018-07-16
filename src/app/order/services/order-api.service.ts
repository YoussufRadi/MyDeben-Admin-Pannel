import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OrderApiService {
  constructor(private http: HttpClient) {}

  currentOrders = () => this.http.get("/api/store/order/current").toPromise();
}
