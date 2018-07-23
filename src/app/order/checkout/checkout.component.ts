import { Component, OnInit } from "@angular/core";
import { OrderApiService } from "../services/order-api.service";
import { DialogService } from "ng2-bootstrap-modal";

import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  users: any[];
  selectedUser: any = {
    name: ""
  };
  selectedUserOrders: any[];
  selectedUserTotal: number = 0;
  selectedUserTotalDue: number = 0;

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

  showConfirm() {
    return this.dialogService.addDialog(TextModalComponent, {
      title: "Are you sure?",
      message: "Press YES if you want to delete selected",
      confirm: true
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
    this.auth.setSidebarValue(3);
    this.fetch();
  }

  getTotal() {
    let total = 0;
    this.selectedUserOrders.forEach(x => (total += x.total_price));
    return total;
  }

  selectUser(user) {
    this.selectedUser = user;
    this.api
      .getUserTotalOrders(this.selectedUser.id)
      .then((data: any) => {
        this.selectedUserOrders = data.orders;
        this.selectedUserTotalDue = data.total;
        this.selectedUserTotal = this.getTotal();
      })
      .catch(err => {
        console.log(err);
        this.showError("Fetching User Details Failed", err);
      });
  }

  checkout(id) {
    this.showConfirm().subscribe(res => {
      if (res)
        this.api
          .checkoutUser(id)
          .then((data: any) => {
            this.showError(
              "Checkout Succeded",
              "User was successfuly checkout"
            );
            this.fetch();
          })
          .catch(err => {
            console.log(err);
            this.showError("Checkout Failed", err);
          });
    });
  }
}
