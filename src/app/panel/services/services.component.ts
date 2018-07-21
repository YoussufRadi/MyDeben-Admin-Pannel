import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";
import { log } from "util";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"]
})
export class ServicesComponent implements OnInit {
  serviceNames: any[] = [];
  serviceList: any[] = [];
  selectedService = {
    name: "test",
    title: "test",
    description: "description",
    price: 40
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

  clearSelected() {
    const values = {
      name: "test",
      title: "test",
      description: "description",
      price: 40,
      image: true
    };
    this.selectedService = values;
  }

  recieveFormData($event) {
    console.log($event);
  }

  setValue(value) {
    this.selectedService = value;
    console.log(this.selectedService);
  }

  editService(id, value) {
    this.api
      .editService(id, value)
      .then(data => {
        console.log(data);
        this.fetchServices();
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteService(id) {
    this.api
      .deleteService(id)
      .then(data => {
        console.log(data);
        this.fetchServices();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
