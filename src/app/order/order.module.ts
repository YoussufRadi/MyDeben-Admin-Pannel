import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { OrderComponent } from "./order.component";
import { SharedModule } from "../shared/shared.module";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";
import { OrderApiService } from "./services/order-api.service";

@NgModule({
  imports: [CommonModule, OrderRoutingModule, SharedModule],
  declarations: [OrderComponent, OrderRequestsComponent],
  providers: [OrderApiService]
})
export class OrderModule {}
