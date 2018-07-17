import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";

import { PanelRoutingModule } from "./panel-routing.module";
import { PanelComponent } from "./panel.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServicesComponent } from "./services/services.component";
import { SharedModule } from "../shared/shared.module";
import { GenerateComponent } from "./generate/generate.component";
import { AddFormComponent } from "./add-form/add-form.component";
import { ProvidersComponent } from './providers/providers.component';

@NgModule({
  imports: [CommonModule, PanelRoutingModule, SharedModule, FormsModule],
  declarations: [
    PanelComponent,
    DashboardComponent,
    ServicesComponent,
    GenerateComponent,
    AddFormComponent,
    ProvidersComponent
  ],
  exports: [AddFormComponent]
})
export class PanelModule {}
