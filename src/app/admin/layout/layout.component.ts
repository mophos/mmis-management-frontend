import { Router } from '@angular/router';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'um-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('modalChangePassword') public modalChangePassword;

  fullname: string;
  jwtHelper: JwtHelper = new JwtHelper();
  collapsible = true;
  collapsed = true;
  public env: any;
  rights: any;
  Purchasing = false;
  Planning = false;
  Inventory = false;
  InventoryWarehouse = false;
  Materials = false;
  Contracts = false;
  Administrator = false;

  constructor(
    private router: Router,
    @Inject('HOME_URL') private homeUrl: string,
    @Inject('API_URL') private apiUrl: string
  ) {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.fullname = `${decodedToken.fullname}`;
    const accessRight = decodedToken.accessRight;
    this.rights = accessRight.split(',');
  }

  ngOnInit() {
    this.env = {
      homeUrl: environment.homeUrl,
      purchasingUrl: environment.purchasingUrl,
      planningUrl: environment.planningUrl,
      inventoryUrl: environment.inventoryUrl,
      materialsUrl: environment.materialsUrl,
      reportUrl: environment.reportUrl,
      umUrl: environment.umUrl,
      contractsUrl: environment.contractsUrl
    };
    this.Purchasing = _.indexOf(this.rights, 'PO_ADMIN') === -1 ? false : true;
    this.Planning = _.indexOf(this.rights, 'BM_ADMIN') === -1 ? false : true;
    this.Inventory = _.indexOf(this.rights, 'WM_ADMIN') === -1 ? false : true;
    this.InventoryWarehouse = _.indexOf(this.rights, 'WM_WAREHOUSE_ADMIN') === -1 ? false : true;
    this.Materials = _.indexOf(this.rights, 'MM_ADMIN') === -1 ? false : true;
    this.Contracts = _.indexOf(this.rights, 'CM_ADMIN') === -1 ? false : true;
    this.Administrator = _.indexOf(this.rights, 'UM_ADMIN') === -1 ? false : true;
  }

  goHome() {
    location.href = this.homeUrl;
  }

  logout() {
    sessionStorage.removeItem('token');
    location.href = this.homeUrl;
  }

  openChangePasswordModal() {
    this.modalChangePassword.openModal();
  }

  downloadManual() {
    const url = `${this.apiUrl}/pdf/manual.pdf`;
    window.open(url, '_blank');
  }

}
