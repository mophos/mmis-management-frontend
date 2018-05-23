import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
  ],
  declarations: [
    ChangePasswordModalComponent,
    LoadingComponent
  ],
  exports: [
    ChangePasswordModalComponent,
    LoadingComponent
  ]
})
export class ModalsModule { }
