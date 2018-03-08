import { PositionService } from './../position.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'um-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  openModal = false;
  positionName: string;
  positionId: string;
  positions: any = [];
  loading = false;

  constructor(
    private positionService: PositionService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getList();
  }

  showModal() {
    this.positionId = null;
    this.positionName = null;

    this.openModal = true;
  }

  getList() {
    this.loading = true;
    this.positionService.all()
      .then((result: any) => {
        if (result.ok) {
          this.positions = result.rows;
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
    if (this.positionName) {
      let promise: any;
      if (this.positionId) {
        promise = this.positionService.update(this.positionId, this.positionName);
      } else {
        promise = this.positionService.save(this.positionName);
      }

      promise.then((result: any) => {
        if (result.ok) {
          this.alertService.success();
          this.getList();
          this.positionId = null;
          this.openModal = false;
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

  remove(position: any) {
    this.alertService.confirm('คุณต้องการลบรายการนี้ [' + position.position_name + '] ใช่หรือไม่?')
      .then(() => {
        this.positionService.remove(position.position_id)
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

  edit(position: any) {
    this.positionId = position.position_id;
    this.positionName = position.position_name;
    this.openModal = true;
  }

}
