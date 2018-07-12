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
  constructor(private authentication: AuthenticationService) {
    this.authentication.getDropdownValue().subscribe(newValue => {
      this.account = newValue;
    });
  }
  ngOnInit() {}

  isLoggedIn() {
    return this.authentication.isAuthenticated();
  }

  toggle(event) {
    this.switch = !this.switch;
    console.log(this.switch);
  }
}
