import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequiredLabelDirective } from "./directives/required-label.directive";
import { SearchPipe } from "./pipes/search.pipe/search.pipe";
import { SortPipe } from "./pipes/order.pipe/sort.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [RequiredLabelDirective, SearchPipe, SortPipe],
  exports: [RequiredLabelDirective, SearchPipe, SortPipe]
})
export class SharedModule {}
