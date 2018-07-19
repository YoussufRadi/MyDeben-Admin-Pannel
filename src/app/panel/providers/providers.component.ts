import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { ActivatedRoute } from "../../../../node_modules/@angular/router";

@Component({
  selector: "app-providers",
  templateUrl: "./providers.component.html",
  styleUrls: ["./providers.component.css"]
})
export class ProvidersComponent implements OnInit {
  services: any[] = [];
  providers: any[] = [];
  constructor(
    private api: ApiManagerService,
    private dialogService: DialogService,
    private activeRouter: ActivatedRoute
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
    });
  }

  fetchServices() {
    this.api
      .getServices()
      .then((data: any) => {
        console.log(data);
        this.services = data.services;
      })
      .catch(err => {
        this.showError("Fetch Services Failed", err.error.detail);
      });
  }

  fetchProviders(id) {
    this.api
      .getProviders(id)
      .then((data: any) => {
        console.log(data);
        this.providers = data.providers;
      })
      .catch(err => {
        this.showError("Fetch Providers Failed", err.error.detail);
      });
  }
  paramId;
  ngOnInit() {
    this.fetchServices();
    this.activeRouter.params.subscribe(id => {
      this.paramId = this.activeRouter.snapshot.params.id;
      this.fetchProviders(this.paramId);
    });
  }

  edit() {
    console.log("edit");
  }

  delete() {
    console.log("delete");
  }
}
