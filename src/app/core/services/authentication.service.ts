import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Observable } from "rxjs";

@Injectable()
export class AuthenticationService {
  token = "ewrewfewf";
  tokenKey: string = "a5smm_utoken";
  private dropdownValue: Subject<string> = new Subject();

  constructor(private router: Router) {}

  login(token) {
    this.setToken(token);
    this.router.navigate(["pannel", "dashboard"]);
  }

  logout() {
    this.removeToken();
    this.router.navigate(["login"]);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  isAuthenticated() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  public getDropdownValue(): Observable<string> {
    return this.dropdownValue.asObservable();
  }

  public setDropdownValue(value: string): void {
    this.dropdownValue.next(value);
  }
}
