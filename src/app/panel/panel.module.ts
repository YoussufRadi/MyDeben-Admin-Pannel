import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PanelRoutingModule } from "./panel-routing.module";
import { PanelComponent } from "./panel.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServicesComponent } from "./services/services.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, PanelRoutingModule, SharedModule],
  declarations: [PanelComponent, DashboardComponent, ServicesComponent]
})
export class PanelModule {}
