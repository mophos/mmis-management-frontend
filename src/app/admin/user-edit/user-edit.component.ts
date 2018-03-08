import { IMyOptions } from 'mydatepicker-th';
import { GroupService } from './../group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../../alert.service';
import { UserService } from './../user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';
import { ProductGroupService } from 'app/admin/product-groups';

@Component({
  selector: 'um-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  warehouseId: string;
  groupId: string;
  username: string;
  password: string;
  fullname: string;
  submitLoading = false;
  loadingPeople = true;
  isActive = false;
  selectedPeople: any;
  peopleId: string;
  openPeopleModal = false;
  startDate: any;
  endDate: any;
  peopleUserId: string;

  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: true
  };

  selectedRights: any = [];
  warehouses: any = [];
  rights: any = [];
  groups: any = [];
  peoples: any = [];

  userId: string;
  selectedProductGroups: any = [];
  productGroups: any = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private productGroupService: ProductGroupService
  ) {
    this.userId = this.route.snapshot.params.userId;
  }

  ngOnInit() {
    this.getData();
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

  getData() {
    this.userService.getWarehousesList()
      .then((result: any) => {
        this.warehouses = result.rows;
        return this.userService.getGroupsList()
      })
      .then((result: any) => {
        this.groups = result.rows;
        return this.userService.getRightsList()
      })
      .then((result: any) => {
        this.rights = result.rows;
        return this.productGroupService.list();
      })
      .then((result: any) => {
        this.productGroups = result.rows;
        return this.userService.getDetail(this.userId)
      })
      .then((result: any) => {
        if (result.ok) {
          if (result.detail) {
            this.peopleId = result.detail.people_id;
            this.username = result.detail.username;
            this.password = null;
            this.fullname = result.detail.fullname;
            this.groupId = result.detail.group_id;
            this.warehouseId = result.detail.warehouse_id;
            this.isActive = result.detail.is_active === 'Y' ? true : false;
            if (moment(result.detail.start_date).isValid()) {
              this.startDate = {
                date: {
                  year: moment(result.detail.start_date).get('year'),
                  month: moment(result.detail.start_date).get('month') + 1,
                  day: moment(result.detail.start_date).get('date')
                }
              }
            }
            if (moment(result.detail.end_date).isValid()) {
              this.endDate = {
                date: {
                  year: moment(result.detail.end_date).get('year'),
                  month: moment(result.detail.end_date).get('month') + 1,
                  day: moment(result.detail.end_date).get('date')
                }
              }
            }

            if (result.detail.access_right) {
              const _rights = result.detail.access_right.split(',');

              for (const v of this.rights) {
                  for (const x of _rights) {
                    if (x === v.right_code) {
                      this.selectedRights.push(v);
                    }
                  }
                }

            }

              if (result.detail.generic_type_id) {
                const _pg = result.detail.generic_type_id.split(',');
                // this.productGroups.forEach(v => {
                for (const v of this.productGroups) {
                  for (const x of _pg) {
                    if (+x === +v.generic_type_id) {
                      this.selectedProductGroups.push(v);
                    }
                  }
                }
              }

            } else {
              this.alertService.error('ไม่พบรายการที่ต้องการแก้ไข');
              this.router.navigate(['/admin/users']);
            }
          } else {
            this.alertService.error();
            this.router.navigate(['/admin/users']);
          }
        })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      });
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
    this.peopleId = this.selectedPeople.people_id;
    this.openPeopleModal = false;
  }

  async saveUser() {
    let productGroups = [];
    let productGroupData = null;

    let adminRight = 'WM_ADMIN';
    let subStockAdminRight = 'WM_WAREHOUSE_ADMIN';

    let idxA = _.findIndex(this.selectedRights, { right_code: adminRight });
    let idxS = _.findIndex(this.selectedRights, { right_code: subStockAdminRight });

    if (idxA > -1 && idxS > -1) {
      this.alertService.error('ไม่สามารถกำหนดสิทธิ์ WM_ADMIN และ WM_WAREHOUSE_ADMIN ในคนเดียวกันได้');
    } else {

      if (this.selectedProductGroups.length) {
        this.selectedProductGroups.forEach(v => {
          productGroups.push(v.generic_type_id);
        });
        productGroupData = productGroups.join(',');
      }

      if (this.startDate && this.peopleId && this.groupId && this.warehouseId && this.selectedRights.length) {
        let rights = [];
        this.selectedRights.forEach(v => {
          rights.push(v.right_code);
        });

        let _rights = rights.join(',');

        let data = {
          peopleId: this.peopleId,
          password: this.password,
          startDate: this.startDate ? `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}` : '0000-00-00',
          endDate: this.endDate ? `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}` : '0000-00-00',
          isActive: this.isActive ? 'Y' : 'N',
          groupId: this.groupId,
          warehouseId: this.warehouseId,
          rights: _rights,
          generic_type_id: productGroupData
        }

        this.submitLoading = true;
        try {
          let rs: any = await this.userService.updateUser(data, this.userId);
          if (rs.ok) {
            this.alertService.success();
            this.router.navigate(['/admin/users']);
          } else {
            console.log(rs.error);
            this.alertService.error();
          }
          this.submitLoading = false;
        } catch (error) {
          this.submitLoading = false;
          console.log(error);
          this.alertService.error(JSON.stringify(error));
        }

      } else {
        this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
      }
    }

  }

}
