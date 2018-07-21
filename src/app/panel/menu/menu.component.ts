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
  catId = -1;
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
    return this.dialogService.addDialog(TextModalComponent, {
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

  setCatId(id) {
    if (this.catId !== id) {
      this.catId = id;
      this.fetchProducts();
    }
  }

  fetchCategories(id, f) {
    this.api
      .getCategory(id)
      .then((data: any) => {
        this.categories = data.categories;
        if (this.categories.length > 0 && f) {
          this.catId = this.categories[0].id;
          this.fetchProducts();
        }
      })
      .catch(err => {
        this.showError("Fetch Categories Failed", err.error);
      });
  }

  fetchProducts() {
    this.api
      .getProduct(this.catId)
      .then((data: any) => {
        this.products = data.products;
      })
      .catch(err => {
        this.showError("Fetch Providers Failed", err.error);
      });
  }

  ngOnInit() {
    this.activeRouter.params.subscribe(() => {
      this.paramId = this.activeRouter.snapshot.params.id;
      this.fetchCategories(this.paramId, true);
    });
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
    if ($event.id == -1) {
      delete $event.id;
      if ($event.price) this.addProduct({ ...$event, category_id: this.catId });
      else this.addCategory($event);
    } else {
      if ($event.price) this.editProduct($event);
      else this.editCategory($event);
    }
  }

  setValue(value) {
    this.selectedService = value;
  }

  addProduct(value) {
    this.api
      .addProduct(value)
      .then(data => {
        this.showError("Added Successfully", "New Product was added");
        this.fetchProducts();
      })
      .catch(err => {
        console.log(err);
        this.showError("Adding Failed", err.error);
      });
  }

  editProduct(value) {
    this.api
      .editProduct(value.id, value)
      .then(data => {
        this.showError("Edited Successfully", "Product was edited");
        this.fetchProducts();
      })
      .catch(err => {
        console.log(err);
        this.showError("Editing Failed", err.error);
      });
  }

  deleteProduct(id) {
    this.showConfirm().subscribe(res => {
      if (res) {
        this.api
          .deleteProduct(id)
          .then(data => {
            this.showError("Deleted Successfully", "Product was deleted");
            this.fetchProducts();
          })
          .catch(err => {
            console.log(err);
            this.showError("Deleting Failed", err.error);
          });
      }
    });
  }

  addCategory(value) {
    const provider_id = this.activeRouter.snapshot.params.id;
    this.api
      .addCategory({ ...value, provider_id })
      .then(data => {
        this.showError("Added Successfully", "New Category was added");
        this.fetchCategories(provider_id, false);
      })
      .catch(err => {
        console.log(err);
        this.showError("Adding Failed", err.error);
      });
  }

  editCategory(value) {
    const provider_id = this.activeRouter.snapshot.params.id;
    this.api
      .editCategory(value.id, value)
      .then(data => {
        this.showError("Edited Successfully", "Category was edited");
        this.fetchCategories(provider_id, false);
      })
      .catch(err => {
        console.log(err);
        this.showError("Editing Failed", err.error);
      });
  }

  deleteCategory(id) {
    this.showConfirm().subscribe(res => {
      if (res) {
        const provider_id = this.activeRouter.snapshot.params.id;
        this.api
          .deleteCategory(id)
          .then(data => {
            this.showError("Deleted Successfully", "Category was deleted");
            this.fetchCategories(provider_id, true);
          })
          .catch(err => {
            console.log(err);
            this.showError("Deleting Failed", err.error);
          });
      }
    });
  }
}
