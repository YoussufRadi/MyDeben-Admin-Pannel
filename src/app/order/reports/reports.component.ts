import { Component, OnInit } from "@angular/core";
import { OrderApiService } from "../services/order-api.service";
import { DialogService } from "ng2-bootstrap-modal";

import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  orders: any[];
  constructor(
    private api: OrderApiService,
    private dialogService: DialogService,
    private auth: AuthenticationService
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
    });
  }

  fetch = () => {
    this.api
      .allOrders()
      .then((data: any) => {
        this.orders = data.orders;
      })
      .catch(err => {
        this.showError("Cancel Orders Fetching Failed", err);
        console.log(err);
      });
  };
  ngOnInit() {
    this.auth.setSidebarValue(4);
    this.fetch();
  }
}
