import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderRoutingModule } from "./order-routing.module";
import { SharedModule } from "../shared/shared.module";
import { OrderRequestsComponent } from "./order-requests/order-requests.component";
import { OrderApiService } from "./services/order-api.service";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ReportsComponent } from "./reports/reports.component";
import { GenerateComponent } from "./generate/generate.component";
import {
  FormsModule,
  ReactiveFormsModule
} from "../../../node_modules/@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderRequestsComponent,
    CheckoutComponent,
    ReportsComponent,
    GenerateComponent
  ],
  providers: [OrderApiService]
})
export class OrderModule {}
