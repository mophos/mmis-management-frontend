import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { LoginService } from '../login.service';
import { AlertService } from '../../alert.service';
import { JwtHelper } from 'angular2-jwt';

import * as _ from 'lodash';

@Component({
  selector: 'um-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  jwtHelper: JwtHelper = new JwtHelper();
  isLoading = false;
  isError = false;
  errorMessage: string;
  warehouses = [];
  warehouseId: any;
  userWarehouseId: any;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.isLoading = false;
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const decodedToken = this.jwtHelper.decodeToken(token);
      // hide spinner
      this.isLoading = false;
      // redirect to admin module
      const accessRight = decodedToken.accessRight;
      if (accessRight) {
        const rights = accessRight.split(',');
        if (_.indexOf(rights, 'UM_ADMIN') > -1) {
          this.router.navigate(['admin']);
        } else {
          // this.router.navigate(['login']);
          this.isError = true;
          this.errorMessage = 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้';
        }
      } else {
        this.isError = true;
        this.errorMessage = 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้';
      }
    }
  }

  enterLogin(event) {
    // enter login
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  doLogin() {
    this.isLoading = true;
    this.loginService.doLogin(this.username, this.password, this.userWarehouseId)
      .then((result: any) => {
        if (result.ok) {
          const token = result.token;
          const decodedToken = this.jwtHelper.decodeToken(token);
          const fullname = `${decodedToken.firstname} ${decodedToken.lastname}`;
          sessionStorage.setItem('token', token);
          // hide spinner
          this.isLoading = false;
          // redirect to admin module
          const accessRight = decodedToken.accessRight;
          const rights = accessRight.split(',');

          if (_.indexOf(rights, 'UM_ADMIN') > -1) {
            this.router.navigate(['admin']);
          } else {
            // this.router.navigate(['login']);
            this.isError = true;
            this.errorMessage = 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้';
          }
        } else {
          this.isLoading = false;
          this.alertService.error(JSON.stringify(result.error));
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.alertService.error(JSON.stringify(error));
      });
  }

  async selectWarehouse(event) {
    const rs: any = await this.loginService.searchWarehouse(this.username);
    if (rs.ok) {
      this.warehouses = rs.rows;
      this.userWarehouseId = rs.rows[0].user_warehouse_id;
    } else {
      this.warehouses = [];
      this.userWarehouseId = null;
    }
  }

}
