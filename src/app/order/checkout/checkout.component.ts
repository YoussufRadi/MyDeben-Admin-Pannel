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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById("print-section").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Reciept</title>
          <style>
            .modal-title{
                  display: none;
            }
            .print-reciept{
              display: none
            }
            .row {
                  display: flex;
                justify-content: space-around;
            }
            .col-lg-3 {
                flex: 0 0 25%;
                max-width: 25%;
            }
            .col-lg-6 {
                flex: 0 0 50%;
                max-width: 50%;
            }
            .col-lg-4 {
                flex: 0 0 33.333333%;
                max-width: 33.333333%;
            .col-lg-8 {
                flex: 0 0 66.666667%;
                max-width: 66.666667%;
            }
            .modal-body[_ngcontent-c11] {
                padding: 20px 50px 20px 50px;
            }
            .modal-body {
                flex: 1 1 auto;
                padding: 1rem;
            }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`);
    popupWin.document.close();
  }
}
