import { AlertService } from './../../alert.service';
import { SettingService } from './../setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'um-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  hospcode: string;
  hospname: string;
  address: string;
  taxId: string;
  telephone: string;
  fax: string;
  ampur: string;
  province: string;
  lat: any;
  lng: any;
  managerName: string;
  managerPosition: string;

  constructor(
    private settingService: SettingService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getSysSetting();
  }

  getSysSetting() {
    this.settingService.getSysSetting('SYS_HOSPITAL')
      .then((result: any) => {
        if (result.ok) {
          if (result.rows) {
            const hospinfo = JSON.parse(result.rows[0].value);
            this.hospcode = hospinfo['hospcode'];
            this.hospname = hospinfo['hospname'];
            this.address = hospinfo['address'];
            this.ampur = hospinfo['ampur'];
            this.province = hospinfo['province'];
            this.fax = hospinfo['fax'];
            this.telephone = hospinfo['telephone'];
            this.taxId = hospinfo['taxId'];
            this.lat = hospinfo['lat'];
            this.lng = hospinfo['lng'];
            this.managerName = hospinfo['managerName'];
            this.managerPosition = hospinfo['managerPosition'];
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
        ampur: this.ampur,
        province: this.province,
        lat: this.lat,
        lng: this.lng,
        managerName: this.managerName,
        managerPosition: this.managerPosition
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
