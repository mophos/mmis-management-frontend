import { AlertService } from './../../alert.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SerialService } from './../serial.service';
import { element } from 'protractor';


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

  constructor(
    private serialService: SerialService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getSerial();
    this.getSerialFormat();
  }

  async getSerial() {
    this.loading = true;
    try {
      const rs: any = await this.serialService.getSerial();
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
      const rs: any = await this.serialService.updateSerial(this.type, this.formatId, this.runningNumber, this.srPrefix);
      if (rs.ok) {
        this.alertService.success();
        this.getSerial();
        this.openModal = false;
      } else {
        this.alertService.error();
      }
    } catch (error) {
      this.alertService.serverError();
    }
  }

}
