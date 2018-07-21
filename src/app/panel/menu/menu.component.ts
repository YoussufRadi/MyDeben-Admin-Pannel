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
  selectedService = {
    id: -1,
    title: "Add a new Item",
    name: "",
    description: "",
    price: 0,
    picture: " "
  };

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
    if (this.catId !== id) {
      this.catId = id;
      this.fetchProducts();
    }
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

  clearSelectedItem() {
    const values = {
      id: -1,
      title: "Add a new Item",
      name: "",
      description: "",
      price: 0,
      picture: " "
    };
    this.selectedService = values;
  }

  clearSelectedCat() {
    const values = {
      id: -1,
      title: "Add a new Item",
      name: "",
      description: "",
      price: undefined,
      picture: " "
    };
    this.selectedService = values;
  }

  recieveFormData($event) {
    console.log($event);
  }

  setValue(value) {
    // value.description = "";
    this.selectedService = value;
    console.log(this.selectedService);
  }

  editService(id, value) {
    this.api
      .editService(id, value)
      .then(data => {
        console.log(data);
        // this.fetchServices();
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
        // this.fetchServices();
      })
      .catch(err => {
        console.log(err);
      });
  }
}
