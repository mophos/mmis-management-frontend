import { AlertService } from './../../alert.service';
import { SettingService } from './../setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'um-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  hospcode: string;
  hospname: string;
  address: string;
  taxId: string;
  telephone: string;
  fax: string;
  managerName: string;
  settings: any[] = [];
  loading = false;

  constructor(
    private settingService: SettingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getSysSetting();
    // this.getSetting();
  }

  getSysSetting() {
    this.loading = true;
    this.settingService.getSysSetting('')
      .then((results: any) => {
        if (results.ok) {
          this.settings = results.rows;
          this.settings.forEach((e, index) => {
            if (e.form_edit === 1) {
              if (e.form_type === 'NUMBER') {
                this.settings[index].input = 'number'; // '<input type="number" name="dataInp">';
              } else {
                this.settings[index].input = 'text'; // '<input type="text" name="dataInp">';
              }
            } else {
              this.settings[index].input = e.value;
            }
          });
        } else {
          console.log(results.error);
          this.alertService.error();
        }
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
        this.alertService.serverError();
      })
  }

  onBlur(event, varName, defaultValue, formType) {
    let dataValue = event.srcElement.value.toUpperCase();
    if (defaultValue !== dataValue) { // && (event.keyCode === 13 || event.keyCode === 9)) {
      if (formType === 'LOGICAL') {
        dataValue = dataValue === 'Y' ? 'Y' : 'N';
      }
      console.log({ varName: varName, dataValue: dataValue, event: event });
      this.settingService.saveSetting(varName, dataValue)
        .then((r: any) => {
          this.getSysSetting();
        }
        );
    }
  }

  getSetting() {
    this.settingService.getSetting()
      .then((result: any) => {
        if (result.ok) {
          if (result.detail) {
            this.hospcode = result.detail.hospcode;
            this.hospname = result.detail.hospname;
            this.address = result.detail.address;
            this.fax = result.detail.fax;
            this.telephone = result.detail.telephone;
            this.taxId = result.detail.tax_id;
            this.managerName = result.detail.manager_name;
          }
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      })
  }

  saveSetting() {
    if (this.hospcode && this.hospname && this.address && this.managerName) {
      const data = {
        hospcode: this.hospcode,
        hospname: this.hospname,
        address: this.address,
        fax: this.fax,
        telephone: this.telephone,
        taxId: this.taxId,
        managerName: this.managerName
      }
      this.settingService.save(data)
        .then((result: any) => {
          if (result.ok) {
            this.alertService.success();
          } else {
            console.log(result.error);
            this.alertService.error();
          }
        })
        .catch(error => {
          console.log(error);
          this.alertService.error();
        })
    } else {
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
    }
  }
}
