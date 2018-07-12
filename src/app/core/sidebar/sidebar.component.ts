import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  switch: boolean = false;
  constructor(private authentication: AuthenticationService) {}
  ngOnInit() {}

  logout() {
    this.authentication.logout();
  }
  toggle(event) {
    this.switch = !this.switch;
    console.log(this.switch);
  }
}
