import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderComponent } from "./order.component";
import { SharedModule } from "../shared/shared.module";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";

@NgModule({
  imports: [CommonModule, OrderRoutingModule, SharedModule],
  declarations: [OrderComponent, OrderRequestsComponent]
})
export class OrderModule {}
