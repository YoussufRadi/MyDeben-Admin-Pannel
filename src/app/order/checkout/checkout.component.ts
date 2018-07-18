import { Component, OnInit } from "@angular/core";
import { OrderApiService } from "../services/order-api.service";
import { DialogService } from "ng2-bootstrap-modal";

import { TextModalComponent } from "../../core/text-modal/text-modal.component";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  users: any[];
  selectedUserId = -1;

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

  fetch = () => {
    this.api
      .checkedInUsers()
      .then((data: any) => {
        console.log(data);

        this.users = data.users;
      })
      .catch(err => {
        this.showError("Fetching Users Failed", err);
        console.log(err);
      });
  };

  ngOnInit() {
    this.fetch();
  }

  selectUser(id) {
    this.selectedUserId = id;
    console.log("selected user id: " + this.selectedUserId);
    this.api
      .getUserTotalOrders(this.selectedUserId)
      .then((data: any) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
