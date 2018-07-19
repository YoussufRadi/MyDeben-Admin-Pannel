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
  addServiceModalTitle = "Add Service";

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
        console.log(data);
        Object.keys(data.providers).forEach(key => {
          this.serviceNames.push(key);
        });
        console.log(this.serviceNames);
        Object.values(data.providers).forEach(val => {
          this.serviceList.push(val);
        });
        console.log(this.serviceList);
      })
      .catch(err => {
        this.showError("error", "error");
        console.log(err);
      });
  }

  recieveNewServiceName($event) {
    this.api
      .addAService({
        name: $event.fieldName
      })
      .then((data: any) => {
        console.log(data);
      })
      .catch(err => {
        this.showError("error", "error");
      });
  }

  edit() {
    console.log("edit");
  }

  delete() {
    console.log("delete");
  }
}
