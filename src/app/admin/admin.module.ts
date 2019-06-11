import { ToThaiDateTimePipe } from './to-thai-date-time.pipe';
import { ModalsModule } from './../modals/modals.module';
import { SerialService } from './serial.service';
import { SettingService } from './setting.service';
import { PositionService } from './position.service';
import { TitleService } from './title.service';
import { PeopleService } from './people.service';
import { RightService } from './right.service';
import { GroupService } from './group.service';
import { UserService } from './user.service';
import { BudgetSourceService } from './budget-source.service';
import { BudgetTypeService } from './budget-type.service';
import { StandardService } from './standard.service';
import { UploadingService } from './uploading.service';
import { ApproveService } from './approve.service';
import { WarehouseService } from './warehouse.service'
import { LocationService } from './location.service'

import { ClarityModule } from '@clr/angular';
import { GroupsComponent } from './groups/groups.component';
import { RightsComponent } from './rights/rights.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './../auth-guard.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgUploaderModule } from 'ngx-uploader';
import { MyDatePickerTHModule } from 'mydatepicker-th';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { GroupAssingComponent } from './group-assing/group-assing.component';
import { PeopleComponent } from './people/people.component';
import { SettingsComponent } from './settings/settings.component';
import { TitlesComponent } from './titles/titles.component';
import { PositionsComponent } from './positions/positions.component';
import { ToThaiDatePipe } from './to-thai-date.pipe';
import { ConfigComponent } from './config/config.component';
import { PurchasingofficerComponent } from './purchasingofficer/purchasingofficer.component';
import { CoBidComponent } from './co-bid/co-bid.component';
import { TypeBidComponent } from './type-bid/type-bid.component';
import { BudgetSourceComponent } from './budget-source/budget-source.component';
import { BudgetTypeComponent } from './budget-type/budget-type.component';
import { SerialManagementComponent } from './serial-management/serial-management.component';
import { NumberOnlyDirective } from './number-only.directive';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayService } from 'app/admin/holiday.service';
import { DateHolidayPipe } from './date-holiday.pipe';
import { ProductGroupService } from 'app/admin/product-groups';
import { ApproveComponent } from './approve/approve.component';
import { DirectivesModule } from '../directives/directives.module';
import { ReportComponent } from './report/report.component';
import { ReportService } from './report.service';
import { HtmlPreviewComponent } from './helper/html-preview/html-preview.component';
import { BackupComponent } from './backup/backup.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { LocationModalComponent } from './location-modal/location-modal.component';
// import { AgxTypeaheadModule } from '@siteslave/agx-typeahead';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ClarityModule,
    AdminRoutingModule,
    MyDatePickerTHModule,
    ModalsModule,
    DirectivesModule,
    // AgxTypeaheadModule
  ],
  declarations: [
    LayoutComponent,
    UsersComponent,
    RightsComponent,
    GroupsComponent,
    UserNewComponent,
    UserEditComponent,
    GroupAssingComponent,
    PeopleComponent,
    SettingsComponent,
    TitlesComponent,
    PositionsComponent,
    ToThaiDatePipe,
    ToThaiDateTimePipe,
    ConfigComponent,
    PurchasingofficerComponent,
    CoBidComponent,
    TypeBidComponent,
    BudgetSourceComponent,
    BudgetTypeComponent,
    BudgetTypeComponent,
    SerialManagementComponent,
    NumberOnlyDirective,
    HolidayComponent,
    DateHolidayPipe,
    ApproveComponent,
    ReportComponent,
    HtmlPreviewComponent,
    BackupComponent,
    WarehouseComponent,
    LocationModalComponent
  ],
  providers: [
    AuthGuard,
    UserService,
    GroupService,
    RightService,
    PeopleService,
    TitleService,
    PositionService,
    SettingService,
    BudgetSourceService,
    BudgetTypeService,
    StandardService,
    UploadingService,
    SerialService,
    HolidayService,
    ProductGroupService,
    ApproveService,
    ReportService,
    WarehouseService,
    LocationService
  ]
})
export class AdminModule { }
