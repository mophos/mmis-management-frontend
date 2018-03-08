import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
  ],
  declarations: [
    ChangePasswordModalComponent
  ],
  exports: [
    ChangePasswordModalComponent
  ]
})
export class ModalsModule { }
