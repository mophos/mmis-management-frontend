import { SerialManagementComponent } from './serial-management/serial-management.component';
import { PositionsComponent } from './positions/positions.component';
import { TitlesComponent } from './titles/titles.component';
import { SettingsComponent } from './settings/settings.component';
import { PeopleComponent } from './people/people.component';
import { GroupAssingComponent } from './group-assing/group-assing.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { LayoutComponent } from './layout/layout.component';
import { RightsComponent } from './rights/rights.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './../auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { PurchasingofficerComponent } from './purchasingofficer/purchasingofficer.component';
import { CoBidComponent } from './co-bid/co-bid.component';
import { TypeBidComponent } from './type-bid/type-bid.component';
import { BudgetSourceComponent } from './budget-source/budget-source.component';
import { BudgetTypeComponent } from './budget-type/budget-type.component';
import { HolidayComponent } from 'app/admin/holiday/holiday.component';
import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { ApproveComponent } from './approve/approve.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'users/new', component: UserNewComponent },
      { path: 'users/edit/:userId', component: UserEditComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'groups/assing/:groupId', component: GroupAssingComponent },
      { path: 'approve', component: ApproveComponent },
      { path: 'rights', component: RightsComponent },
      { path: 'people', component: PeopleComponent },
      { path: 'titles', component: TitlesComponent },
      { path: 'positions', component: PositionsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'purchasing-officer', component: PurchasingofficerComponent },
      { path: 'co-bid', component: CoBidComponent },
      { path: 'type-bid', component: TypeBidComponent },
      { path: 'budget-source', component: BudgetSourceComponent },
      { path: 'budget-type', component: BudgetTypeComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'serial', component: SerialManagementComponent },
      { path: 'holiday', component: HolidayComponent },
      { path: 'report', component: ReportComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
