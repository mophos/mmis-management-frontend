import { LoadingComponent } from './../../modals/loading/loading.component';
import { IMyOptions } from 'mydatepicker-th';
import { GroupService } from './../group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './../../alert.service';
import { UserService } from './../user.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AutocompletePeopleComponent } from '../../directives/autocomplete-people/autocomplete-people.component';

import * as _ from 'lodash';
import * as moment from 'moment';
import { ProductGroupService } from 'app/admin/product-groups';

@Component({
  selector: 'um-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  @ViewChild('loading') loading: LoadingComponent;
  @ViewChild('people') public people: AutocompletePeopleComponent;
  warehouseId: string;
  warehouseType;
  warehouseTypeId;
  warehouseCheck = 'หน่วยเบิก';
  warehousesList = [];
  groupId: string;
  username: string;
  password: string;
  fullname: string;
  submitLoading = false;
  loadingPeople = true;
  isActive = false;
  peopleId: string;
  openPeopleModal = false;
  startDate: any;
  endDate: any;
  peopleUserId: string;
  rights = [];
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: true
  };
  userId: string;
  selectedProductGroups: any = [];
  productGroups: any = [];

  peoples: any = [];
  selectedRights: any = [];
  warehouses: any = [];
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

  openModal = false;
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

  async ngOnInit() {
    this.loading.show();
    await this.getRights();
    await this.getWarehosues();
    await this.getGroups();
    await this.getProductGroups()
      .then(async (result) => {
        await this.getData();
        await this.loading.hide();
      }).catch((err) => {
        this.loading.hide();
      });
  }

  getWarehosues() {
    this.userService.getWarehousesList()
      .then((result: any) => {
        if (result.ok) {
          this.warehousesList = result.rows;
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
      const rs: any = await this.productGroupService.list();
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


  getData() {
    this.userService.getDetail(this.userId)
      .then((result: any) => {
        console.log(result);

        if (result.ok) {
          if (result.detail) {
            this.peopleId = result.detail.people_id;
            this.username = result.detail.username;
            this.password = null;
            this.fullname = result.detail.fullname;
            this.people.setQuery(this.fullname);
            this.isActive = result.detail.is_active === 'Y' ? true : false;
            this.rights = result.detail.rights;
            this.rights.forEach(r => {
              this.warehouses.push({
                warehouse_id: r.warehouse_id,
                warehouse_name: r.warehouse_name,
                warehouse_type: r.warehouse_type,
                warehouse_type_id: r.warehouse_type_id,
                is_actived: r.is_actived
              })
            });
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

  async saveUser() {

    if (this.startDate && this.peopleId && this.rights.length) {

      const data = {
        peopleId: this.peopleId,
        password: this.password,
        startDate: this.startDate ? `${this.startDate.date.year}-${this.startDate.date.month}-${this.startDate.date.day}` : '0000-00-00',
        endDate: this.endDate ? `${this.endDate.date.year}-${this.endDate.date.month}-${this.endDate.date.day}` : '0000-00-00',
        isActive: this.isActive ? 'Y' : 'N'
      }
      this.submitLoading = true;
      try {
        const rs: any = await this.userService.updateUser(data, this.rights, this.userId);
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

  getGenricTypeData() {
    this.selectedProductGroups = [];
    const idxR = _.findIndex(this.rights, { 'warehouse_id': this.warehouseId, 'warehouse_type_id': this.warehouseTypeId });
    if (idxR > -1) {
      const _genericTypeId = this.rights[idxR].generic_type_id.split(',');
      const _obj = [];
      _genericTypeId.forEach(r => {
        const objPg = {
          'generic_type_id': +r
        }
        _obj.push(objPg)
      });
      this.productGroups.forEach(p => {
        const idx = _.findIndex(_obj, { 'generic_type_id': +p.generic_type_id });
        if (idx > -1) {
          this.selectedProductGroups.push(p);
        }
      });
    }
  }

  getRightData() {

    const idxR = _.findIndex(this.rights, { 'warehouse_id': this.warehouseId, 'warehouse_type_id': this.warehouseTypeId });
    if (idxR > -1) {
      const _rights = this.rights[idxR].access_right.split(',');
      const _objRight = [];
      _rights.forEach(r => {
        const objRight = {
          'right_code': r
        }
        _objRight.push(objRight)
      });

      this.rights_bm.forEach(r => {
        const idx = _.findIndex(_objRight, { 'right_code': r.right_code })
        if (idx > -1) {
          r.check = true;
        } else {
          r.check = false;
        }
      });
      this.rights_wm.forEach(r => {
        const idx = _.findIndex(_objRight, { 'right_code': r.right_code })
        if (idx > -1) {
          r.check = true;
        } else {
          r.check = false;
        }
      });
      this.rights_mm.forEach(r => {
        const idx = _.findIndex(_objRight, { 'right_code': r.right_code })
        if (idx > -1) {
          r.check = true;
        } else {
          r.check = false;
        }
      });
      this.rights_um.forEach(r => {
        const idx = _.findIndex(_objRight, { 'right_code': r.right_code })
        if (idx > -1) {
          r.check = true;
        } else {
          r.check = false;
        }
      });
      this.rights_cm.forEach(r => {
        const idx = _.findIndex(_objRight, { 'right_code': r.right_code })
        if (idx > -1) {
          r.check = true;
        } else {
          r.check = false;
        }
      });
      this.rights_po.forEach(r => {
        const idx = _.findIndex(_objRight, { 'right_code': r.right_code })
        if (idx > -1) {
          r.check = true;
        } else {
          r.check = false;
        }
      });

    } else {
      this.rights_bm.forEach(r => {
        r.check = false;
      });
      this.rights_wm.forEach(r => {
        r.check = false;
      });
      this.rights_mm.forEach(r => {
        r.check = false;
      });
      this.rights_um.forEach(r => {
        r.check = false;
      });
      this.rights_cm.forEach(r => {
        r.check = false;
      });
      this.rights_po.forEach(r => {
        r.check = false;
      });
    }
  }

  onPeopleSelected(e) {
    this.selectedPeople = e.people_id;
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


  addWarehouse() {
    const idx = _.findIndex(this.warehousesList, { 'warehouse_id': +this.warehouseId });
    if (idx > -1) {
      const obj = {
        'warehouse_id': this.warehousesList[idx].warehouse_id,
        'warehouse_name': this.warehousesList[idx].warehouse_name,
        'warehouse_type': this.warehouseCheck,
        'warehouse_type_id': this.warehouseCheck === 'คลังใหญ่' ? 1 : 2,
        'is_actived': 'Y'
      };
      const idxDup = _.findIndex(this.warehouses, { 'warehouse_id': obj.warehouse_id, 'warehouse_type_id': obj.warehouse_type_id })
      if (idxDup > -1) {
      } else {
        this.warehouses.push(obj);
      }
    }
  }

  async setRight(w) {
    this.openModal = true;
    this.warehouseId = w.warehouse_id;
    this.warehouseTypeId = w.warehouse_type_id;
    const idx = _.findIndex(this.rights, { 'warehouse_id': w.warehouse_id, 'warehouse_type_id': w.warehouse_type_id });
    if (idx > -1) {
      if (this.rights[idx].group_id) {
        this.groupId = this.rights[idx].group_id;
      }
    } else {
      this.groupId = null;
    }
    await this.getRightData();
    await this.getGenricTypeData()
  }

  async saveRight() {
    this.openModal = false;
    await this.groupRight();

    const productGroups = [];
    let genericTypeId = null;

    const idxA = _.findIndex(this.selectedRights, { right_code: 'WM_ADMIN' });
    const idxS = _.findIndex(this.selectedRights, { right_code: 'WM_WAREHOUSE_ADMIN' });


    if (idxA > -1 && idxS > -1) {
      this.alertService.error('ไม่สามารถกำหนดสิทธิ์ (คลังใหญ่) WM_ADMIN และ คลังย่อย (WM_WAREHOUSE_ADMIN) ใน คลัง เดียวกันได้');
    } else {
      const idx = _.findIndex(this.rights, { 'warehouse_id': this.warehouseId, 'warehouse_type_id': this.warehouseTypeId });
      if (idx > -1) {
        this.rights.splice(idx, 1);
      }
      const rights = [];
      this.selectedRights.forEach(v => {
        rights.push(v.right_code);
      });
      const _rights = rights.join(',');

      if (this.selectedProductGroups.length) {
        this.selectedProductGroups.forEach(v => {
          productGroups.push(v.generic_type_id);
        });
        genericTypeId = productGroups.join(',');
      }

      const obj = {
        warehouse_id: this.warehouseId,
        warehouse_type_id: this.warehouseTypeId,
        generic_type_id: genericTypeId,
        access_right: _rights,
        group_id: this.groupId
      }
      this.rights.push(obj);
    }
  }

  removeWarehouse(w) {
    const idxW = _.findIndex(this.warehouses, { 'warehouse_id': w.warehouse_id, 'warehouse_type_id': w.warehouse_type_id })
    const idxR = _.findIndex(this.rights, { 'warehouse_id': w.warehouse_id, 'warehouse_type_id': w.warehouse_type_id })
    if (idxW > -1) {
      this.warehouses.splice(idxW, 1);
    }
    if (idxR > -1) {
      this.rights.splice(idxR, 1);
    }
  }

  checkWarehouse1() {
    this.warehouseCheck = 'คลังใหญ่';
  }

  checkWarehouse2() {
    this.warehouseCheck = 'หน่วยเบิก';
  }

  changeStatus(e, w) {
    const idx = _.findIndex(this.rights, { 'warehouse_id': w.warehouse_id, 'warehouse_type': w.warehouse_type });
    if (idx > -1) {
      this.rights[idx].is_actived = e.target.checked ? 'Y' : 'N';
    }
  }
}
