import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CoreRoutingModule } from "./core-routing.module";
import { LoginComponent } from "./login/login.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterModule } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { ApiInterceptorService } from "./services/api-interceptor.service";
import { NgHttpLoaderModule } from "ng-http-loader";
import { RegisterComponent } from "./register/register.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ApiManagerService } from "./services/api-manager.service";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule //TODO Test if spinner works
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SidebarComponent,
    NotFoundComponent
  ],
  exports: [RouterModule, SidebarComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthenticationService,
    AuthGuardService,
    ApiManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {}
