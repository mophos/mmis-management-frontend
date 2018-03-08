import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BudgetSourceService } from './../budget-source.service';
import { AlertService } from './../../alert.service';

@Component({
  selector: 'um-budget-source',
  templateUrl: './budget-source.component.html',
  styleUrls: ['./budget-source.component.css']
})
export class BudgetSourceComponent implements OnInit {

  budgetSources: any[] = [];

  loading = false;
  openModal = false;
  saving = false;

  budgetSourceId: number;
  budgetSourceName: string;

  constructor(
    private budgetSourceService: BudgetSourceService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getBudgetSource();
  }

  getBudgetSource() {
    this.loading = true;
    this.budgetSourceService.getBudgetSource()
      .then((results: any) => {
        if (results.ok) {
          this.budgetSources = results.rows;
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

  addBudgetSource() {
    this.budgetSourceId = null;
    this.budgetSourceName = null;
    this.openModal = true;
  }

  editBudgetSource(event) {
    this.budgetSourceId = event.bgsource_id;
    this.budgetSourceName = event.bgsource_name;
    this.openModal = true;
  }

  deleteBudgetSource(event) {
    this.alertService.confirm('คุณต้องการลบรายการนี้ ใช่หรือไม่? [' + event.bgsource_name + ']')
      .then(() => {
        this.budgetSourceService.deleteBudgetSource(event.bgsource_id)
          .then((results: any) => {
            if (results.ok) {
              this.getBudgetSource();
              this.alertService.success();
            } else {
              this.alertService.error(JSON.stringify(results.error));
            }
          })
          .catch(() => {
            this.alertService.serverError();
          });
      })
      .catch(() => { });
  }

  saveBudgetSource() {
    let promise: Promise<any>;
      this.saving = true;
      if (this.budgetSourceId) {
        promise = this.budgetSourceService.updateBudgetSource(this.budgetSourceId, this.budgetSourceName);
      } else {
        promise = this.budgetSourceService.insertBudgetSource(this.budgetSourceName);
      }
      promise.then((results: any) => {
        if (results.ok) {
          this.getBudgetSource();
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

}
