import { SettingService } from './../setting.service';
import { element } from 'protractor';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'um-co-bid',
  templateUrl: './co-bid.component.html',
  styleUrls: ['./co-bid.component.css']
})
export class CoBidComponent implements OnInit {
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
    this.rows.forEach(e => {
      this.bidId = e.bid_id > this.bidId ? e.bid_id : this.bidId;
    });
    this.bidId++;
    this.bidName = '';
  }
  onClickEdit(row) {
    this.bidId = row.bid_id;
    this.bidRef = row.bid_id;
    this.bidName = row.bid_name;
    this.typeInput = 'แก้ไข';
    this.modalInput = true;
  }

  onClickDelete(row) {
    this.alertService.confirm('ยืนยันการลบข้อมูล?')
        .then(() => {
          this.settingService.deleteTypeBid(row.bid_id)
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
      bid_id: this.bidId,
      bid_name: this.bidName,
    };
    return new Promise((resolve, reject) => {
      this.settingService.saveTypeBid(this.bidRef, formInput)
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
    const tableName = 'l_bid_type';
    const selectText = '*';
    const orderText = 'bid_id';
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
