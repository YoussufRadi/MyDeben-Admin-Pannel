import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PanelRoutingModule } from "./panel-routing.module";
import { PanelComponent } from "./panel.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServicesComponent } from "./services/services.component";
import { SharedModule } from "../shared/shared.module";
import { GenerateComponent } from './generate/generate.component';
import { AddServiceComponent } from './add-service/add-service.component';

@NgModule({
  imports: [CommonModule, PanelRoutingModule, SharedModule],
  declarations: [
    PanelComponent,
    DashboardComponent,
    ServicesComponent,
    GenerateComponent,
    AddServiceComponent
  ]
})
export class PanelModule {}
