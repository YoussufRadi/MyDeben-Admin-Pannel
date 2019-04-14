import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PanelComponent } from "./panel.component";
import { ServicesComponent } from "./services/services.component";
import { ProvidersComponent } from "./providers/providers.component";
import { MenuComponent } from "./menu/menu.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "services",
    component: ServicesComponent
  },
  {
    path: "provider/:id",
    component: ProvidersComponent
  },
  {
    path: "category/:id",
    component: MenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {}
