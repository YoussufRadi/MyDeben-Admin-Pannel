import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";
import { OrderComponent } from "./order.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ReportsComponent } from "./reports/reports.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "requests",
    pathMatch: "full"
  },
  {
    path: "requests",
    component: OrderRequestsComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "reports",
    component: ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
