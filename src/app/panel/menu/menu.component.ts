import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiManagerService } from "../../core/services/api-manager.service";
import { DialogService } from "ng2-bootstrap-modal";
import { TextModalComponent } from "../../core/text-modal/text-modal.component";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  categories: any[] = [];
  products: any[] = [];
  paramId;
  catId;
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

  setCatId(id) {
    this.catId = id;
    this.fetchProducts();
  }

  fetchCategories(id) {
    this.api
      .getCategories(id)
      .then((data: any) => {
        console.log(data);
        this.categories = data.categories;
        this.catId = this.categories[0].id;
        this.fetchProducts();
      })
      .catch(err => {
        this.showError("Fetch Services Failed", err.error.detail);
      });
  }

  fetchProducts() {
    this.api
      .getProducts(this.catId)
      .then((data: any) => {
        console.log(data);
        this.products = data.products;
      })
      .catch(err => {
        this.showError("Fetch Providers Failed", err.error.detail);
      });
  }

  ngOnInit() {
    // this.fetchServices();
    this.activeRouter.params.subscribe(() => {
      this.paramId = this.activeRouter.snapshot.params.id;
      this.fetchCategories(this.paramId);
    });
  }

  edit() {
    console.log("edit");
  }

  delete() {
    console.log("delete");
  }
}
