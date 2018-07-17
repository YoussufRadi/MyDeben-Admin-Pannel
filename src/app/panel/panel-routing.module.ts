import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PanelComponent } from "./panel.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServicesComponent } from "./services/services.component";
import { GenerateComponent } from "./generate/generate.component";
import { ProvidersComponent } from "./providers/providers.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "generate",
    component: GenerateComponent
  },
  {
    path: "services",
    component: ServicesComponent
  },
  {
    path: "providers",
    component: ProvidersComponent
  },
  {
    path: "dashboard",
    component: PanelComponent,
    children: [{ path: "", component: DashboardComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {}
