import { Router } from '@angular/router';
import { AlertService } from './../../alert.service';
import { UserService } from './../user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { IMyOptions } from 'mydatepicker-th';

import * as _ from 'lodash';
import { ProductGroupService } from 'app/admin/product-groups';
import { GroupService } from 'app/admin/group.service';

@Component({
  selector: 'um-user-new',
  templateUrl: './user-new.component.html'
})
export class UserNewComponent implements OnInit {
  warehouseId: string;
  groupId: string;
  username: string;
  password: string;
  fullname: string;
  submitLoading = false;
  loadingPeople = false;
  isActive = false;
  peopleId: string;
  openPeopleModal = false;
  startDate: any;
  endDate: any;
  
  selectedProductGroups: any = [];
  productGroups: any = [];

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };

  peoples: any = [];
  selectedRights: any = [];
  warehouses: any = [];
  rights: any = [];
  groups: any = [];
  selectedPeople: any;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private productGroupService: ProductGroupService,
    private groupService: GroupService,

  ) { }

  ngOnInit() {
    this.getWarehosues();
    this.getGroups();
    this.getRights();
    this.getProductGroups();
  }

  setRightWithGroup(event: any) {
    this.selectedRights = [];
    this.groupService.getRights(this.groupId)
      .then((result: any) => {
        // console.log(result.rights);
        if (result.ok) {
          _.forEach(this.rights, (v: any) => {
            // console.log(v.group_id, this.groupId);
            _.forEach(result.rows, (x: any) => {
              if (v.right_id === x.right_id) {
                this.selectedRights.push(v);
              }
            })
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      })
  }

  getWarehosues() {
    this.userService.getWarehousesList()
      .then((result: any) => {
        if (result.ok) {
          this.warehouses = result.rows;
        } else {
          this.alertService.error();
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      });
  }

  async getProductGroups() {
    try {
      let rs: any = await this.productGroupService.list();
      if (rs.ok) {
        this.productGroups = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error));
    }
  }

  getGroups() {
    this.userService.getGroupsList()
      .then((result: any) => {
        if (result.ok) {
          this.groups = result.rows;
        } else {
          this.alertService.error();
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      });
  }

  getRights() {
    this.userService.getRightsList()
      .then((result: any) => {
        if (result.ok) {
          this.rights = result.rows;
        } else {
          this.alertService.error();
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      });
  }

  saveUser() {
    if (this.username && this.selectedPeople && this.password && this.groupId && this.warehouseId && this.selectedRights.length) {
      let productGroups = [];
      let productGroupData = null;

      let adminRight = 'WM_ADMIN';
      let subStockAdminRight = 'WM_WAREHOUSE_ADMIN';

      let idxA = _.findIndex(this.selectedRights, { right_code: adminRight });
      let idxS = _.findIndex(this.selectedRights, { right_code: subStockAdminRight });

      
      if (idxA > -1 && idxS > -1) {
        this.alertService.error('ไม่สามารถกำหนดสิทธิ์ WM_ADMIN และ WM_WAREHOUSE_ADMIN ในคนเดียวกันได้');
      } else { 
        let rights = [];
        this.selectedRights.forEach(v => {
          rights.push(v.right_code);
        });

        let _rights = rights.join(',');

        let data = {
          peopleId: this.selectedPeople.people_id,
          username: this.username,
          password: this.password,
          startDate: this.startDate ? `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}` : null,
          endDate: this.endDate ? `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}` : null,
          isActive: this.isActive ? 'Y' : 'N',
          groupId: this.groupId,
          warehouseId: this.warehouseId,
          rights: _rights,
          generic_type_id: productGroupData
        }
        this.submitLoading = true;
        this.userService.saveUser(data)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.router.navigate(['/admin/users']);
            } else {
              console.log(result.error);
              this.alertService.error();
            }
            this.submitLoading = false;
          })
          .catch(error => {
            this.submitLoading = false;
            console.log(error);
            this.alertService.serverError();
          });
      }

    } else {
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
    }
  }

  searchPeople() {
    this.openPeopleModal = true;
    this.loadingPeople = true;
    this.peoples = [];
    this.userService.getPeoplesList()
      .then((result: any) => {
        if (result.ok) {
          this.peoples = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
        this.loadingPeople = false;
      })
      .catch((error) => {
        this.loadingPeople = false;
        console.log(error);
        this.alertService.serverError();
      });
  }

  setPeople() {
    this.fullname = `${this.selectedPeople.title_name} ${this.selectedPeople.fname} ${this.selectedPeople.lname}`;
    this.openPeopleModal = false;
  }
}
