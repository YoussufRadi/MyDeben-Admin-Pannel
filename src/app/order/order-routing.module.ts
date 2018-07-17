import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ReportsComponent } from "./reports/reports.component";
import { GenerateComponent } from "./generate/generate.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "generate",
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
  },
  {
    path: "generate",
    component: GenerateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
