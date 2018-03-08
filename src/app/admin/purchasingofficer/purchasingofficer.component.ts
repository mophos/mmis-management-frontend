import { element } from 'protractor';
import { Component, OnInit, EventEmitter, NgZone, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
import { SettingService } from './../setting.service';
import { AlertService } from '../../alert.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'um-purchasingofficer',
  templateUrl: './purchasingofficer.component.html',
  styleUrls: ['./purchasingofficer.component.css']
})
export class PurchasingofficerComponent implements OnInit {
  myDatePickerOptions: IMyOptions = {
    inline: false,
    dateFormat: 'dd mmm yyyy',
    editableDateField: false,
    showClearDateBtn: false
  };
  txtMonthAbbr = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  officerTypes: any[];
  officers: any[];
  peoples: any[];
  modalInput = false;
  typeInput = '';
  inpPId = 0;
  inpPeople = 0;
  inpType = 2;
  inpIsActive = 1;




  projectID = 0;
  projectDate: any;
  projectName = '';
  projectSource = '';
  projectBudget = 0;
  projectBudgetSource = '';
  startDate: any;
  endDate: any;
  isactive = 1;
  projectRemark = '';

  projectLists: any[];
  currentPrijectId: any;
  activePage = 1;

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private settingService: SettingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getOfficer();
    this.getPeoples();
    this.getOfficerTypes();

  }

  getOfficer() {
    this.officers = [];
      this.settingService.getPurchasingOfficer(0)
        .then((results: any) => {
          console.log({ results: results });
          if (results.ok) {
            this.officers = results.rows;
            this.officers.forEach((element, index) => {
              this.officers[index]['ico'] = element.isactive === 1 ?
                'Y' : 'N';
            });
            // console.log(this.officers);
            // resolve(this.officers);
          } else {
            console.log(results.error);
            // reject(results.error);
          }
        })
        .catch((err) => {
          console.log(err);
          // reject();
        });
  }

  getOfficerTypes() {
    this.officerTypes = [];
    return new Promise((resolve, reject) => {
      this.settingService.selectData('um_purchasing_officer_type',
        '*', '', '', '')
        .then((results: any) => {
          if (results.ok) {
            this.officerTypes = results.rows;
            resolve(results.rows);
          } else {
            reject(results.error);
          }
        })
        .catch(() => {
          reject();
        });
    });
  }

  getPeoples() {
    this.peoples = [];
    return new Promise((resolve, reject) => {
      this.settingService.selectData('um_people',
        '*', '', '', '')
        .then((results: any) => {
          if (results.ok) {
            this.peoples = results.rows;
            resolve(results.rows);
          } else {
            reject(results.error);
          }
        })
        .catch(() => {
          reject();
        });
    });
  }

  onClickAdd() {
    this.inpPId = 0;
    this.inpPeople = 0;
    this.inpType = 3;
    this.inpIsActive = 1;
    this.typeInput = 'เพิ่ม';
    this.modalInput = true;
  }

  onClickEdit(row) {
    this.inpPId = row.p_id;
    this.inpPeople = row.people_id;
    this.inpType = row.type_id;
    this.inpIsActive = row.isactive;
    this.typeInput = 'แก้ไข';
    this.modalInput = true;
  }

  onClickDelete(row) {
    this.alertService.confirm('ยืนยันการลบข้อมูล?')
        .then(() => {
          this.settingService.deletePurchasingOfficer(row.p_id)
            .then((resolve: any) => {
              this.getOfficer();
            })
            .catch(error => {
              this.alertService.serverError();
            });
      });
  }

  onClickSave() {
    const formInput = {
      people_id: this.inpPeople,
      type_id: this.inpType,
      isactive: this.inpIsActive,
    };
    return new Promise((resolve, reject) => {
      this.settingService.savePurchasingOfficer(this.inpPId, formInput)
        .then(() => {
          this.getOfficer();
          this.modalInput = false;
          this.alertService.success('บันทึกเรียบร้อย');
        })
        .catch((err) => {
          this.alertService.error(err);
        });
    });
  }


}
