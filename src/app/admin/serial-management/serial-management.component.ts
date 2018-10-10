import { AlertService } from './../../alert.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SerialService } from './../serial.service';
import { element } from 'protractor';
import * as moment from 'moment';

@Component({
  selector: 'um-serial-management',
  templateUrl: './serial-management.component.html',
  styleUrls: ['./serial-management.component.css']
})
export class SerialManagementComponent implements OnInit {
  serials: any = [];
  serialFormats: any = [];
  type: string;
  comment: string;
  formatId: string;
  formatExample: string;
  runningNumber: number;
  srPrefix: number;
  loading = false;
  openModal = false;
  yearList = [];
  year;
  warehouseId;
  constructor(
    private serialService: SerialService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    let year = moment().get('year');
    const month = moment().get('month') + 1;
    if (month >= 10) {
      year += 1;
    }
    for (let i = year + 1; i > year - 3; i--) {
      this.yearList.push({ year: i, yearTH: i + 543 });
    }
    this.year = this.yearList[1].year;
    this.getSerial(this.year);
    this.getSerialFormat();

  }

  async selectYear() {
    await this.getSerial(this.year);

  }
  async getSerial(year) {
    this.loading = true;
    try {
      const rs: any = await this.serialService.getSerial(year);
      if (rs.ok) {
        this.serials = rs.rows;
      } else {
        this.alertService.error();
      }
      this.ref.detectChanges();
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.alertService.serverError();
    }
  }

  async getSerialFormat() {
    try {
      const rs: any = await this.serialService.getSerialFormat();
      if (rs.ok) {
        this.serialFormats = rs.rows;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.serverError();
    }
  }

  showEditModal(serial) {
    this.warehouseId = serial.warehouse_id;
    this.type = serial.sr_type;
    this.comment = serial.comment;
    this.formatId = serial.serial_format_id;
    this.formatExample = serial.serial_format;
    this.runningNumber = serial.sr_no;
    this.srPrefix = serial.sr_prefix;
    this.openModal = true;
  }

  onFormatChange(event) {
    this.formatExample = this.serialFormats.filter(value => value.serial_format_id === event)[0].serial_format;
  }

  async save() {
    try {
      const rs: any = await this.serialService.updateSerial(this.type, this.formatId, this.runningNumber, this.srPrefix, this.year, this.warehouseId);
      if (rs.ok) {
        this.alertService.success();
        this.getSerial(this.year);
        this.openModal = false;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.serverError();
    }
  }

}
