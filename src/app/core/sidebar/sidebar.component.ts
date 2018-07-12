import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  switch: boolean = false;
  account: string = "Sign in/ Sign up";
  selected: number = 5;
  constructor(private authentication: AuthenticationService) {
    this.authentication.getAccountText().subscribe(newValue => {
      this.account = newValue;
    });
  }
  ngOnInit() {
    if (this.authentication.isAuthenticated()) this.account = "My account";
  }

  isLoggedIn() {
    return this.authentication.isAuthenticated();
  }
  setSelected($event, num: number) {
    this.selected = num;
  }

  toggle(event) {
    this.switch = !this.switch;
  }
}
