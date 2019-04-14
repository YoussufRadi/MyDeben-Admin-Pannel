import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-providers",
  templateUrl: "./providers.component.html",
  styleUrls: ["./providers.component.scss"]
})
export class ProvidersComponent implements OnInit {
  services: any[] = [];
  providers: any[] = [];
  selectedService = {
    id: -1,
    title: "Add a new Item",
    name: "",
    description: undefined,
    price: undefined,
    picture: " "
  };
  constructor(
    private api: ApiManagerService,
    private dialogService: DialogService,
    private activeRouter: ActivatedRoute,
    private auth: AuthenticationService
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
    });
  }

  showConfirm() {
    return this.dialogService.addDialog(TextModalComponent, {
      title: "Are you sure?",
      message: "Press YES if you want to delete selected",
      confirm: true
    });
  }

  fetchServices(): any {
    return this.api
      .getService()
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
      .getProvider(id)
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
    this.auth.setSidebarValue(2);
    this.fetchServices();
    this.activeRouter.params.subscribe(id => {
      this.paramId = this.activeRouter.snapshot.params.id;
      this.fetchProviders(this.paramId);
    });
  }

  clearSelectedProvider() {
    const values = {
      id: -1,
      title: "Add a new Provider",
      name: "",
      description: undefined,
      price: undefined,
      picture: " "
    };
    this.selectedService = values;
  }

  clearSelectedService() {
    const values = {
      id: -1,
      title: "Add a new Service",
      name: "",
      description: undefined,
      price: undefined,
      picture: undefined
    };
    this.selectedService = values;
  }

  recieveFormData($event) {
    if ($event.id == -1) {
      delete $event.id;
      if ($event.picture)
        this.addProvider({ ...$event, service_id: this.paramId });
      else this.addService($event);
    } else {
      if ($event.picture) this.editProvider($event);
      else this.editService($event);
    }
  }

  setValue(value) {
    this.selectedService = value;
  }

  addProvider(value) {
    const provider_id = this.activeRouter.snapshot.params.id;
    this.api
      .addProvider({ ...value, provider_id })
      .then(data => {
        this.showError("Added Successfully", "New Provider was added");
        this.fetchProviders(this.paramId);
      })
      .catch(err => {
        console.log(err);
        this.showError("Adding Failed", err.error);
      });
  }

  editProvider(value) {
    this.api
      .editProvider(value.id, value)
      .then(data => {
        this.showError("Edited Successfully", "Provider was edited");
        this.fetchProviders(this.paramId);
      })
      .catch(err => {
        console.log(err);
        this.showError("Editing Failed", err.error);
      });
  }

  deleteProvider(id) {
    this.showConfirm().subscribe(res => {
      if (res) {
        this.api
          .deleteProvider(id)
          .then(data => {
            this.showError("Deleted Successfully", "Provider was deleted");
            this.fetchProviders(this.paramId);
          })
          .catch(err => {
            console.log(err);
            this.showError("Deleting Failed", err.error);
          });
      }
    });
  }

  addService(value) {
    this.api
      .addService(value)
      .then(data => {
        this.showError("Added Successfully", "New Service was added");
        this.fetchServices().then(() => {
          this.paramId = Math.max.apply(
            Math,
            this.services.map(function(o) {
              return o.id;
            })
          );
        });
      })
      .catch(err => {
        console.log(err);
        this.showError("Adding Failed", err.error);
      });
  }

  editService(value) {
    this.api
      .editService(value.id, value)
      .then(data => {
        this.showError("Edited Successfully", "Service was edited");
        this.fetchServices();
      })
      .catch(err => {
        console.log(err);
        this.showError("Editing Failed", err.error);
      });
  }

  deleteService(id) {
    this.showConfirm().subscribe(res => {
      if (res) {
        this.api
          .deleteService(id)
          .then(data => {
            this.showError("Deleted Successfully", "Service was deleted");
            this.fetchServices().then(() => {
              if (this.services.length > 0) {
                this.paramId = this.services[0].id;
              }
            });
          })
          .catch(err => {
            console.log(err);
            this.showError("Deleting Failed", err.error);
          });
      }
    });
  }
}
