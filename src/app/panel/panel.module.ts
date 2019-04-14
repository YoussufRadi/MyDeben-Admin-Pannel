import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PanelRoutingModule } from "./panel-routing.module";
import { PanelComponent } from "./panel.component";
import { ServicesComponent } from "./services/services.component";
import { SharedModule } from "../shared/shared.module";
import { AddFormComponent } from "./add-form/add-form.component";
import { ProvidersComponent } from "./providers/providers.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
  imports: [
    CommonModule,
    PanelRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PanelComponent,
    MenuComponent,
    ServicesComponent,
    AddFormComponent,
    ProvidersComponent
  ],
  exports: [AddFormComponent]
})
export class PanelModule {}
