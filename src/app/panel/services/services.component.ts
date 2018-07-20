import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"]
})
export class ServicesComponent implements OnInit {
  serviceNames: any[] = [];
  serviceList: any[] = [];
  selectedService = {
    name: "",
    id: -1
  };

  constructor(
    private api: ApiManagerService,
    private dialogService: DialogService
  ) {}

  showError(title, message) {
    let disposable = this.dialogService.addDialog(TextModalComponent, {
      title: title,
      message: message
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
        Object.values(data.providers).forEach(val => {
          this.serviceList.push(val);
        });
      })
      .catch(err => {
        this.showError("Fetch Services Failed", err.error.detail);
        console.log(err);
      });
  }

  ngOnInit() {
    this.fetchServices();
  }

  recieveNewServiceName($event) {
    console.log($event);
    this.api
      .addAService({
        name: $event.fieldName
      })
      .then((data: any) => {
        console.log(data);
        this.fetchServices();
      })
      .catch(err => {
        this.showError("Adding Service Failed", err.error.detail);
      });
  }

  recieveEditedServiceName($event) {
    console.log($event);
  }

  editService(service) {
    this.selectedService = {
      name: service.name,
      id: service.id
    };
  }

  saveEditService() {
    console.log(this.selectedService.id);

    this.api
      .editService(this.selectedService.id, {
        name: this.selectedService.name
      })
      .then(data => {
        console.log(data);
        this.fetchServices();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteService(service) {
    this.selectedService = {
      name: service.name,
      id: service.id
    };
    console.log("delete");
  }

  confirmDeleteService() {
    this.api
      .deleteService(this.selectedService.id)
      .then(data => {
        console.log(data);
        this.fetchServices();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
