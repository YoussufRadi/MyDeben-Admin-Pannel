import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"]
})
export class ServicesComponent implements OnInit {
  serviceNames: any[] = [];
  serviceList: any[] = [];
  editedService = {
    name: ""
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

  ngOnInit() {
    this.api
      .getProvidersByService()
      .then((data: any) => {
        Object.keys(data.providers).forEach(key => {
          if (data.providers["" + key].length > 0) {
            this.serviceNames.push({
              name: key,
              id: data.providers["" + key][0].service_id
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
        this.showError("error", "error");
        console.log(err);
      });
  }

  recieveNewServiceName($event) {
    console.log($event);
    // this.api
    //   .addAService({
    //     name: $event.fieldName
    //   })
    //   .then((data: any) => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     this.showError("error", "error");
    //   });
  }

  recieveEditedServiceName($event) {
    console.log($event);
  }

  editService(service) {
    this.editedService = service;
  }

  saveEditService() {
    // api to edit service
  }

  delete(service) {
    console.log("delete");
  }
}
