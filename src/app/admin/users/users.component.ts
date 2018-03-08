import { Router } from '@angular/router';
import { AlertService } from './../../alert.service';
import { UserService } from './../user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'um-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any = [];
  logs: any = [];
  loading = false;
  loadingSwitch = false;
  openModalSwitchUser = false;
  openModalActionLogs = false;
  userSwitchings = [];
  loadingLogs = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  getUsers() {
    this.loading = true;
    this.userService.all()
      .then((result: any) => {
        this.loading = false;
        if (result.ok) {
          this.users = result.rows;
          this.ref.detectChanges();
        } else {
          this.alertService.error();
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
        this.alertService.serverError();
      });
  }

  remove(user) {
    this.alertService.confirm('คุณต้องการลบ [' + user.fullname + ']')
      .then(() => {
        this.userService.removeUser(user.user_id)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.getUsers();
            } else {
              console.log(result.error);
              this.alertService.error();
            }
          })
          .catch((error) => {
            this.alertService.serverError();
          });
      })
      .catch(() => { });
  }

  edit(user) {
    this.router.navigate(['/admin/users/edit', user.user_id])
  }

  ngOnInit() {
    this.getUsers();
  }

  openSwitchUsers(user: any) {
    this.loadingSwitch = true;
    this.userService.getSwitchLogs(user.user_id)
      .then((result: any) => {
        if (result.ok) {
          this.userSwitchings = result.rows;
          this.openModalSwitchUser = true;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
  }

  openActionLogs(user: any) {
    this.loadingLogs = true;
    this.userService.getActionLogs(user.user_id)
      .then((result: any) => {
        if (result.ok) {
          this.logs = result.rows;
          this.openModalActionLogs = true;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
  }
}
