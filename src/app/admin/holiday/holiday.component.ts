import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../holiday.service';
import { AlertService } from 'app/alert.service';
import { IMyOptions } from 'mydatepicker-th';
import * as moment from 'moment';
@Component({
  selector: 'um-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  loading = false;
  days: any = [];
  addModal = false;
  types: any;
  type: any;
  date: any;
  detail: any;
  loop: any;
  editModal = false;
  active = true;
  id: any;


  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
    // componentDisabled: true
  };
  constructor(private holidayService: HolidayService, private alertService: AlertService) { }

  ngOnInit() {
    this.getHoliday();
    this.getType();
  }

  getHoliday() {
    this.loading = true;
    this.holidayService.getHolidays()
      .then((result: any) => {
        if (result.ok) {
          this.days = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error(result.error);
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      })
    this.loading = false;
  }
  async addHoliday() {
    let _date;
    this.loading = true;
    if (this.loop) {
      _date = moment('2000-' +
        this.date.date.month + '-' + this.date.date.day).format('YYYY-MM-DD');
    } else {
      _date = moment(this.date.date.year + '-' +
        this.date.date.month + '-' + this.date.date.day).format('YYYY-MM-DD');
    }
    const data = {
      'date': _date,
      'detail': this.detail,
      'type': this.type,
      'is_delete': 0,
      'is_active': this.active ? 1 : 0,
      'is_year': this.loop ? 1 : 0
    }
    let rs;
    if (this.editModal) {
      rs = await this.holidayService.editHoliday(this.id, data);
    } else {
      rs = await this.holidayService.addHoliday(data);
    }
    this.getHoliday();
    this.addModal = false;
    this.editModal = false;

    if (!rs.ok) {
      this.alertService.error('ข้อมูลซ้ำ');
    } else {
      this.alertService.success();
    }

  }
  getType() {
    this.holidayService.getType()
      .then((result: any) => {
        if (result.ok) {
          this.types = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error(result.error);
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      })
  }
  async switchActive(e, id) {
    await this.holidayService.updateActive(id, e.target.checked ? '1' : '0')
  }
  onClickAdd() {
    this.id = null;
    this.detail = null;
    this.date = null;
    this.type = null
    this.loop = null
    this.active = true;
    this.addModal = true;
  }
  showEditModal(data) {
    this.detail = data.detail;
    if (data.is_year) {

    }
    this.date = {
      date: {
        year: moment(data.date).get('year'),
        month: moment(data.date).get('month') + 1,
        day: moment(data.date).get('date')
      }
    };

    this.type = data.type;
    this.loop = data.is_year ? true : false;
    this.active = data.is_active ? true : false;
    this.addModal = true;
    this.editModal = true;
    this.id = data.id;
  }
  async delete(id, idx) {
    this.alertService.confirm('คุณต้องการลบ ' + this.days[idx].detail).then(async () => {
      this.loading = true;
      await this.holidayService.deleteHoliday(id);
      this.getHoliday();
      this.loading = false;
    })
  }
}
