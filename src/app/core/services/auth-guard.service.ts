import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean | Promise<boolean> {
    let token = this.authentication.isAuthenticated();

    if (!token) {
      console.error("User is not authenticated.");
      this.router.navigate(["/login"]);
      return false;
    } else return true;
  }
}
