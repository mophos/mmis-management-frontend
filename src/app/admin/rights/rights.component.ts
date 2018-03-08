import { AlertService } from './../../alert.service';
import { RightService } from './../right.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'um-rights',
  templateUrl: './rights.component.html',
  styleUrls: ['./rights.component.css']
})
export class RightsComponent implements OnInit {
  openModalRight = false;
  rightName: string;
  rightCode: string;
  rightId: string;
  rights: any = [];
  loading = false;

  constructor(
    private rightService: RightService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getList();
  }

  openModal() {
    this.rightId = null;
    this.rightCode = null;
    this.rightName = null;

    this.openModalRight = true;
  }

  getList() {
    this.loading = true;
    this.rightService.all()
      .then((result: any) => {
        if (result.ok) {
          this.rights = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
        this.ref.detectChanges();
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
        this.alertService.serverError();
      });
  }

  save() {
    if (this.rightCode && this.rightName) {
      let promise: any;
      if (this.rightId) {
        promise = this.rightService.update(this.rightId, this.rightName, this.rightCode);
      } else {
        promise = this.rightService.save(this.rightName, this.rightCode);
      }

      promise.then((result: any) => {
        if (result.ok) {
          this.alertService.success();
          this.getList();
          this.rightId = null;
          this.openModalRight = false;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
        .catch(error => {
          console.log(error);
          this.alertService.serverError();
        });
    }
  }

  remove(right: any) {
    this.alertService.confirm('คุณต้องการลบรายการนี้ [' + right.right_name + '] ใช่หรือไม่?')
      .then(() => {
        this.rightService.remove(right.right_id)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.getList();
            } else {
              console.log(result.error);
              this.alertService.error();
            }
          })
          .catch(error => {
            console.log(error);
            this.alertService.serverError();
          });
      })
      .catch(() => { });
  }

  edit(right: any) {
    this.rightId = right.right_id;
    this.rightName = right.right_name;
    this.rightCode = right.right_code;
    this.openModalRight = true;
  }
}
