import { Component, OnInit } from "@angular/core";
import { OrderApiService } from "../services/order-api.service";
import { DialogService } from "ng2-bootstrap-modal";

import { TextModalComponent } from "../../core/text-modal/text-modal.component";
@Component({
  selector: "app-order-requests",
  templateUrl: "./order-requests.component.html",
  styleUrls: ["./order-requests.component.scss"]
})
export class OrderRequestsComponent implements OnInit {
  orders: any[];
  constructor(
    private api: OrderApiService,
    private dialogService: DialogService
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
    });
  }

  serve(id) {
    this.api
      .serve(id)
      .then(() => {
        this.showError("Serve Order", "Order Successfully Served");
        this.fetch();
      })
      .catch(err => {
        this.showError("Serve Order Failed", err);
        console.log(err);
      });
  }

  cancel(id) {
    this.api
      .cancel(id)
      .then(() => {
        this.showError("Cancel Order", "Order Successfully Cancelled");
        this.fetch();
      })
      .catch(err => {
        this.showError("Cancel Order Failed", err);
        console.log(err);
      });
  }

  fetch = () => {
    this.api
      .currentOrders()
      .then((data: any) => {
        this.orders = data.orders;
      })
      .catch(err => {
        this.showError("Cancel Order Failed", err);
        console.log(err);
      });
  };
  ngOnInit() {
    this.fetch();
  }
}
