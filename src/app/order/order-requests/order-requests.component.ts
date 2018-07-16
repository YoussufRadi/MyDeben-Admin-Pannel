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

  ngOnInit() {
    this.api
      .currentOrders()
      .then((data: any) => {
        this.orders = data.orders;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
