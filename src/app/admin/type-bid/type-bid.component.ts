import { element } from 'protractor';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingService } from './../setting.service';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'um-type-bid',
  templateUrl: './type-bid.component.html',
  styleUrls: ['./type-bid.component.css']
})
export class TypeBidComponent implements OnInit {
  rows: any[];
  currentPrijectId: any;
  activePage = 1;
  modalInput = false;
  typeInput = '';
  bidId: any;
  bidName: any;
  bidRef = 0;
  loading = false;

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private settingService: SettingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getRows();
  }

  onClickAdd() {
    this.typeInput = 'เพิ่ม';
    this.modalInput = true;
    this.bidId = 0;
    this.bidRef = 0;
    this.rows.forEach(element => {
      this.bidId = element.id > this.bidId ? element.id : this.bidId;
    });
    this.bidId++;
    this.bidName = '';
  }
  onClickEdit(row) {
    this.bidId = row.id;
    this.bidRef = row.id;
    this.bidName = row.name;
    this.typeInput = 'แก้ไข';
    this.modalInput = true;
  }

  onClickDelete(row) {
    this.alertService.confirm('ยืนยันการลบข้อมูล?')
        .then(() => {
          this.settingService.deleteBidProcess(row.id)
            .then((resolve: any) => {
              this.getRows();
            })
            .catch(error => {
              this.alertService.serverError();
            });
      });
  }

  onClickSave() {
    const formInput = {
      id: this.bidId,
      name: this.bidName,
    };
    return new Promise((resolve, reject) => {
      this.settingService.saveBidProcess(this.bidRef, formInput)
        .then(() => {
          this.getRows();
          this.modalInput = false;
          this.alertService.success('บันทึกเรียบร้อย');
        })
        .catch((err) => {
          this.alertService.error(err);
        });
    });
  }

  getRows() {
    const tableName = 'l_bid_process';
    const selectText = '*';
    const orderText = 'id';
    this.rows = [];
    this.getData(tableName, selectText, '', '', orderText);
  }

  getData(tableName, selectText, whereText, groupBy, orderText) {
    return new Promise((resolve, reject) => {
      this.loading = true;
      this.settingService.selectData(tableName, selectText, whereText, groupBy, orderText)
        .then((results: any) => {
          if (results.ok) {
            this.rows = results.rows;
            resolve(results.rows);
          } else {
            reject(results.error);
          }
          this.loading = false;
        })
        .catch(() => {
          reject();
          this.loading = false;
        });
    });
  }

}
