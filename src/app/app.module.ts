import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';
import { HttpModule } from '@angular/http';
import { AlertService } from './alert.service';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule,
    LoginModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [
    AlertService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: 'HOME_URL', useValue: environment.homeUrl },
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'API_PLANNING', useValue: environment.apiPlanningUrl },
    { provide: 'API_CONTRACT', useValue: environment.apiContract }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
