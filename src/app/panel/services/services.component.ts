import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"]
})
export class ServicesComponent implements OnInit {
  serviceNames: any[] = [];
  serviceList: any[] = [];
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

  fetchServices() {
    this.serviceNames = [];
    this.serviceList = [];
    this.api
      .getProvidersByService()
      .then((data: any) => {
        Object.keys(data.providers).forEach((key: string) => {
          if (data.providers[key].length > 0) {
            this.serviceNames.push({
              name: key,
              id: data.providers[key][0].service_id
            });
          } else {
            this.serviceNames.push({
              name: key,
              id: -1
            });
          }
        });
        Object.values(data.providers).forEach((val: any[]) => {
          if (val[0].id != null) this.serviceList.push(val);
        });
      })
      .catch(err => {
        this.showError("Fetch Services Failed", err.error.detail);
        console.log(err);
      });
  }

  ngOnInit() {
    this.fetchServices();
    this.auth.setSidebarValue(2);
  }

  selectedServiceId;
  clearSelectedProvider(sid) {
    const values = {
      id: -1,
      title: "Add a new Provider",
      name: "",
      description: undefined,
      price: undefined,
      picture: " "
    };
    this.selectedService = values;
    this.selectedServiceId = sid;
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
        this.addProvider({ ...$event, service_id: this.selectedServiceId });
      else this.addService($event);
    } else this.editService($event);
  }

  setValue(value) {
    this.selectedService = value;
  }

  addProvider(value) {
    this.api
      .addProvider(value)
      .then(data => {
        this.showError("Added Successfully", "New Provider was added");
        this.fetchServices();
      })
      .catch(err => {
        console.log(err);
        this.showError("Adding Failed", err.error);
      });
  }

  addService(value) {
    this.api
      .addService(value)
      .then(data => {
        this.showError("Added Successfully", "New Service was added");
        this.fetchServices();
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
            this.fetchServices();
          })
          .catch(err => {
            console.log(err);
            this.showError("Deleting Failed", err.error);
          });
      }
    });
  }
}
