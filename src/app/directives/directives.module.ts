import { SearchUserComponent } from './search-user/search-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';
import { AutocompletePeopleComponent } from './autocomplete-people/autocomplete-people.component';
@NgModule({
  declarations: [
    SearchUserComponent,
    AutocompletePeopleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgxTypeaheadModule
  ],
  exports:[
    SearchUserComponent,
    AutocompletePeopleComponent
  ]
})
export class DirectivesModule { }
