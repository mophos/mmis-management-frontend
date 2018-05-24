import { Router } from '@angular/router';
import { AlertService } from './../../alert.service';
import { UserService } from './../user.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { IMyOptions } from 'mydatepicker-th';

import * as _ from 'lodash';
import { ProductGroupService } from 'app/admin/product-groups';
import { GroupService } from 'app/admin/group.service';

@Component({
  selector: 'um-user-new',
  templateUrl: './user-new.component.html'
})
export class UserNewComponent implements OnInit {
  @ViewChild('people') public people: any;
  warehouseId: string;
  groupId: string;
  username: string;
  password: string;
  submitLoading = false;
  isActive = true;
  peopleId: string;
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
  rights_po: any = [];
  rights_wm: any = [];
  rights_bm: any = [];
  rights_um: any = [];
  rights_cm: any = [];
  rights_mm: any = [];
  groups: any = [];
  selectedPeople: any;

  allUM = false;
  allPO = false;
  allWM = false;
  allBM = false;
  allCM = false;
  allMM = false;

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
        if (result.ok) {
          console.log(result.rows);
          this.rights_bm.forEach(r => {
            const idx = _.findIndex(result.rows, { 'right_id': r.right_id })
            if (idx > -1) {
              r.check = true;
            } else {
              r.check = false;
            }
          });
          this.rights_wm.forEach(r => {
            const idx = _.findIndex(result.rows, { 'right_id': r.right_id })
            if (idx > -1) {
              r.check = true;
            } else {
              r.check = false;
            }
          });
          this.rights_mm.forEach(r => {
            const idx = _.findIndex(result.rows, { 'right_id': r.right_id })
            if (idx > -1) {
              r.check = true;
            } else {
              r.check = false;
            }
          });
          this.rights_um.forEach(r => {
            const idx = _.findIndex(result.rows, { 'right_id': r.right_id })
            if (idx > -1) {
              r.check = true;
            } else {
              r.check = false;
            }
          });
          this.rights_cm.forEach(r => {
            const idx = _.findIndex(result.rows, { 'right_id': r.right_id })
            if (idx > -1) {
              r.check = true;
            } else {
              r.check = false;
            }
          });
          this.rights_po.forEach(r => {
            const idx = _.findIndex(result.rows, { 'right_id': r.right_id })
            if (idx > -1) {
              r.check = true;
            } else {
              r.check = false;
            }
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
    this.getRightPO();
    this.getRightWM();
    this.getRightMM();
    this.getRightBM();
    this.getRightCM();
    this.getRightUM();
  }

  async getRightPO() {
    try {
      const rs: any = await this.userService.getRight('PO');
      if (rs.ok) {
        this.rights_po = rs.rows;
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error))
    }
  }

  async getRightWM() {
    try {
      const rs: any = await this.userService.getRight('WM');
      if (rs.ok) {
        this.rights_wm = rs.rows;
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error))
    }
  }

  async getRightBM() {
    try {
      const rs: any = await this.userService.getRight('BM');
      if (rs.ok) {
        this.rights_bm = rs.rows;
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error))
    }
  }

  async getRightCM() {
    try {
      const rs: any = await this.userService.getRight('CM');
      if (rs.ok) {
        this.rights_cm = rs.rows;
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error))
    }
  }

  async getRightMM() {
    try {
      const rs: any = await this.userService.getRight('MM');
      if (rs.ok) {
        this.rights_mm = rs.rows;
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error))
    }
  }

  async getRightUM() {
    try {
      const rs: any = await this.userService.getRight('UM');
      if (rs.ok) {
        this.rights_um = rs.rows;
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error))
    }
  }

  groupRight() {
    this.selectedRights = [];
    this.rights_bm.forEach(e => {
      if (e.check === true) {
        this.selectedRights.push(e);
      }
    });
    this.rights_cm.forEach(e => {
      if (e.check === true) {
        this.selectedRights.push(e);
      }
    });
    this.rights_mm.forEach(e => {
      if (e.check === true) {
        this.selectedRights.push(e);
      }
    });
    this.rights_wm.forEach(e => {
      if (e.check === true) {
        this.selectedRights.push(e);
      }
    });
    this.rights_um.forEach(e => {
      if (e.check === true) {
        this.selectedRights.push(e);
      }
    });
    this.rights_po.forEach(e => {
      if (e.check === true) {
        this.selectedRights.push(e);
      }
    });
    console.log(this.selectedRights);

  }

  async saveUser() {
    await this.groupRight();
    if (this.username && this.selectedPeople && this.password && this.groupId && this.warehouseId && this.selectedRights.length) {
      const productGroups = [];
      const productGroupData = null;

      const adminRight = 'WM_ADMIN';
      const subStockAdminRight = 'WM_WAREHOUSE_ADMIN';

      const idxA = _.findIndex(this.selectedRights, { right_code: adminRight });
      const idxS = _.findIndex(this.selectedRights, { right_code: subStockAdminRight });


      if (idxA > -1 && idxS > -1) {
        this.alertService.error('ไม่สามารถกำหนดสิทธิ์ WM_ADMIN และ WM_WAREHOUSE_ADMIN ใน USER เดียวกันได้');
      } else {
        const rights = [];
        this.selectedRights.forEach(v => {
          rights.push(v.right_code);
        });

        const _rights = rights.join(',');

        const data = {
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

  checkAllUM() {
    this.allUM = !this.allUM;
    this.rights_um.forEach(r => {
      r.check = this.allUM;
    });
  }
  checkAllWM() {
    this.allWM = !this.allWM;
    this.rights_wm.forEach(r => {
      r.check = this.allWM;
    });
  }
  checkAllMM() {
    this.allMM = !this.allMM;
    this.rights_mm.forEach(r => {
      r.check = this.allMM;
    });
  }
  checkAllCM() {
    this.allCM = !this.allCM;
    this.rights_cm.forEach(r => {
      r.check = this.allCM;
    });
  }
  checkAllBM() {
    this.allBM = !this.allBM;
    this.rights_bm.forEach(r => {
      r.check = this.allBM;
    });
  }
  checkAllPO() {
    this.allPO = !this.allPO;
    this.rights_po.forEach(r => {
      r.check = this.allPO;
    });
  }

  onPeopleSelected(e) {
    console.log(e);
    this.selectedPeople = e.people_id;
  }
}
