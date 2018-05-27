import { UserService } from './../user.service';
import { GroupService } from './../group.service';
import { AlertService } from './../../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'um-group-assing',
  templateUrl: './group-assing.component.html',
  styleUrls: ['./group-assing.component.css']
})
export class GroupAssingComponent implements OnInit {

  selectedRights: any = [];
  rights: any = [];
  groupId: string;
  groupName: string;
  submitLoading = false;

  rights_po: any = [];
  rights_wm: any = [];
  rights_bm: any = [];
  rights_um: any = [];
  rights_cm: any = [];
  rights_mm: any = [];
  allUM = false;
  allPO = false;
  allWM = false;
  allBM = false;
  allCM = false;
  allMM = false;

  constructor(
    private groupService: GroupService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.groupId = this.route.snapshot.params.groupId;
  }

  async ngOnInit() {
    await this.getRights();
    await this.getData();
  }

  getRights() {
    // this.groupService.getRights(this.groupId)
    //   .then((result: any) => {
    //     if (result.ok) {
    //       if (result.groupName) {
    //         let _groupRights = result.rows;
    //         this.rights = result.rights;
    //         this.groupName = result.groupName;

    //         this.rights.forEach(v => {
    //           _groupRights.forEach(x => {
    //             if (x.right_id === v.right_id) {
    //               this.selectedRights.push(v);
    //             }
    //           });
    //         });
    //       } else {
    //         this.router.navigate(['/admin/groups']);
    //       }
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.alertService.serverError();
    //   });
    this.getRightPO();
    this.getRightWM();
    this.getRightMM();
    this.getRightBM();
    this.getRightCM();
    this.getRightUM();

  }

  getData() {
    this.groupService.getRights(this.groupId)
      .then((result: any) => {
        if (result.ok) {
          if (result.groupName) {
            this.groupName = result.groupName;
          }
          if (result.rows) {
            const _objRight = result.rows;
            let checkAll = 0;
            this.rights_bm.forEach(r => {
              const idx = _.findIndex(_objRight, { 'right_id': r.right_id })
              if (idx > -1) {
                r.check = true;
              } else {
                checkAll++;
                r.check = false;
              }
            });
            if (checkAll === 0) {
              this.allBM = true;
            }
            checkAll = 0;
            this.rights_wm.forEach(r => {
              const idx = _.findIndex(_objRight, { 'right_id': r.right_id })
              if (idx > -1) {
                r.check = true;
              } else {
                checkAll++;
                r.check = false;
              }
            });
            if (checkAll === 0) {
              this.allWM = true;
            }
            checkAll = 0;
            this.rights_mm.forEach(r => {
              const idx = _.findIndex(_objRight, { 'right_id': r.right_id })
              if (idx > -1) {
                r.check = true;
              } else {
                checkAll++;
                r.check = false;
              }
            });
            if (checkAll === 0) {
              this.allMM = true;
            }
            checkAll = 0;
            this.rights_um.forEach(r => {
              const idx = _.findIndex(_objRight, { 'right_id': r.right_id })
              if (idx > -1) {
                r.check = true;
              } else {
                checkAll++;
                r.check = false;
              }
            });
            if (checkAll === 0) {
              this.allUM = true;
            }
            checkAll = 0;
            this.rights_cm.forEach(r => {
              const idx = _.findIndex(_objRight, { 'right_id': r.right_id })
              if (idx > -1) {
                r.check = true;
              } else {
                checkAll++;
                r.check = false;
              }
            });
            if (checkAll === 0) {
              this.allCM = true;
            }
            checkAll = 0;
            this.rights_po.forEach(r => {
              const idx = _.findIndex(_objRight, { 'right_id': r.right_id })
              if (idx > -1) {
                r.check = true;
              } else {
                checkAll++;
                r.check = false;
              }
            });
            if (checkAll === 0) {
              this.allPO = true;
            }
          }
        }
      });
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

  async saveRights() {
    await this.groupRight();
    if (this.groupId && this.groupName && this.selectedRights.length) {
      const rights = [];
      this.selectedRights.forEach(v => {
        rights.push(v.right_id);
      });
      this.submitLoading = true;
      this.groupService.saveRights(rights, this.groupId, this.groupName)
        .then((result: any) => {
          if (result.ok) {
            this.alertService.success();
            this.router.navigate(['/admin/groups']);
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

    } else {
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
    }
  }

}
