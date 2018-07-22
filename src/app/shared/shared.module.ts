import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequiredLabelDirective } from "./directives/required-label.directive";
import { SearchPipe } from "./pipes/search.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [RequiredLabelDirective, SearchPipe],
  exports: [RequiredLabelDirective, SearchPipe]
})
export class SharedModule {}
