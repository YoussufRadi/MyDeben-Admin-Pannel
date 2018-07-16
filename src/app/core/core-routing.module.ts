import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { LoginComponent } from "./login/login.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forget",
    component: ForgetPasswordComponent
  },
  {
    path: "reset",
    component: ResetPasswordComponent
  },
  {
    path: "panel",
    canActivate: [AuthGuardService],
    loadChildren: "../panel/panel.module#PanelModule"
  },
  {
    path: "order",
    canActivate: [AuthGuardService],
    loadChildren: "../order/order.module#OrderModule"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
