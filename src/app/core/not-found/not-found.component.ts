import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrls: ["./not-found.component.scss"]
})
export class NotFoundComponent implements OnInit {
  time = 30;
  i = 0;
  number;
  selector3: any;
  selector2: any;
  selector1: any;
  constructor() {}

  ngOnInit() {
    this.selector3 = document.querySelector(".thirdDigit");
    this.selector2 = document.querySelector(".secondDigit");
    this.selector1 = document.querySelector(".firstDigit");
  }
  randomNum = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  loop3 = setInterval(() => {
    if (this.i > 40) {
      clearInterval(this.loop3);
      this.selector3.textContent = 4;
    } else {
      this.selector3.textContent = this.randomNum();
      this.i++;
    }
  }, this.time);

  loop2 = setInterval(() => {
    if (this.i > 80) {
      clearInterval(this.loop2);
      this.selector2.textContent = 0;
    } else {
      this.selector2.textContent = this.randomNum();
      this.i++;
    }
  }, this.time);
  loop1 = setInterval(() => {
    if (this.i > 100) {
      clearInterval(this.loop1);
      this.selector1.textContent = 4;
    } else {
      this.selector1.textContent = this.randomNum();
      this.i++;
    }
  }, this.time);
}
