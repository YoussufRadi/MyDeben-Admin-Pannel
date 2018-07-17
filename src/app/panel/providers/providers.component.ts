import { Component, OnInit } from "@angular/core";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";

@Component({
  selector: "app-providers",
  templateUrl: "./providers.component.html",
  styleUrls: ["./providers.component.css"]
})
export class ProvidersComponent implements OnInit {
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

  ngOnInit() {}
}
