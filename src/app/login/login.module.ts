import { ClarityModule } from '@clr/angular';
import { LoginService } from './login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    LoginRoutingModule
  ],
  declarations: [LoginPageComponent],
  providers: [LoginService]
})
export class LoginModule { }
