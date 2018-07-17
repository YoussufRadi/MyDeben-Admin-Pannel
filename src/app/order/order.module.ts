import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderComponent } from "./order.component";
import { SharedModule } from "../shared/shared.module";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";
import { OrderApiService } from "./services/order-api.service";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ReportsComponent } from "./reports/reports.component";

@NgModule({
  imports: [CommonModule, OrderRoutingModule, SharedModule],
  declarations: [
    OrderComponent,
    OrderRequestsComponent,
    CheckoutComponent,
    ReportsComponent
  ],
  providers: [OrderApiService]
})
export class OrderModule {}
