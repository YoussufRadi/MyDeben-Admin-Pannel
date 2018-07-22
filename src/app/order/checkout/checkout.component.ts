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
    if (this.selectedUserOrders.length > 0) {
      this.selectedUserOrders.forEach(x => (total += x.total_price));
    }
    return total;
  }

  selectUser(user) {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.api
      .getUserTotalOrders(this.selectedUser.id)
      .then((data: any) => {
        this.selectedUserOrders = data.oredrs; // to be corrected!
        this.selectedUserTotal = this.getTotal();
      })
      .catch(err => {
        this.showError("error", "error");
      });
  }
}
