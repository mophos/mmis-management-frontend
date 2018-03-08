import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';

import { BudgetTypeService } from '../budget-type.service';
import { AlertService } from './../../alert.service';

@Component({
  selector: 'um-budget-type',
  templateUrl: './budget-type.component.html',
  styleUrls: ['./budget-type.component.css']
})
export class BudgetTypeComponent implements OnInit {

  types: any[] = [];

  loading = false;
  openModal = false;
  saving = false;

  typeId: number;
  typeName: string;

  constructor(
    private budgetTypeService: BudgetTypeService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getBudgetType();
  }

  getBudgetType() {
    this.loading = true;
    this.budgetTypeService.getBudgetType()
      .then((results: any) => {
        if (results.ok) {
          this.types = results.rows;
          this.types.forEach((e, index) => {
            this.types[index].txtIsactive = e.isactive === 1 ? 'ใช่' : 'ไม่ใช่';
          });
          this.ref.detectChanges();
        } else {
          this.alertService.error(JSON.stringify(results.error));
        }
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
        this.alertService.serverError();
      });
  }

  addType() {
    this._initialBudgetType();
    this.openModal = true;
  }

  editType(p) {
    this._initialBudgetType();
    this.typeId = p.bgtype_id;
    this.typeName = p.bgtype_name;
    this.ref.detectChanges();
    this.openModal = true;
  }

  deleteType(p) {
    this.alertService.confirm('คุณต้องการลบรายการนี้ ใช่หรือไม่? [' + p.bgtype_name + ']')
      .then(() => {
        this.budgetTypeService.deleteBudgetType(p.bgtype_id)
          .then((results: any) => {
            if (results.ok) {
              this.getBudgetType();
              this.alertService.success();
            } else {
              this.alertService.error(JSON.stringify(results.error));
            }
          })
          .catch(() => {
            this.alertService.serverError();
          });
      })
      .catch(() => { })
  }

  saveType() {
    let promise: Promise<any>;
    this.saving = true;
    if (this.typeId) {
      promise = this.budgetTypeService.updateBudgetType(this.typeId, this.typeName);
    } else {
      promise = this.budgetTypeService.insertBudgetType(this.typeName);
    }
    promise.then((results: any) => {
      if (results.ok) {
        this.getBudgetType();
        this.alertService.success();
        this.openModal = false;
      } else {
        this.alertService.error(JSON.stringify(results.error));
      }
      this.saving = false;
    })
      .catch(() => {
        this.saving = false;
        this.alertService.serverError();
      });
  }

  private _initialBudgetType() {
    this.typeId = null;
    this.typeName = null;
  }

}
