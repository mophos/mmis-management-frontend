import { SearchUserComponent } from "./search-user/search-user.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
@NgModule({
  declarations: [
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgxTypeaheadModule
  ],
  exports:[
    SearchUserComponent
  ]
})
export class DirectivesModule { }
