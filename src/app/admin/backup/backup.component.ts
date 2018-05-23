import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from '../../alert.service';
import { SettingService } from '../setting.service';
import { LoadingComponent } from '../../modals/loading/loading.component';

@Component({
  selector: 'um-backup',
  templateUrl: './backup.component.html',
  styles: []
})
export class BackupComponent implements OnInit {
  @ViewChild('loading') loading: LoadingComponent;

  items: any = [];
  token: any;

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private alertService: AlertService,
    private settingService: SettingService) {
    this.token = sessionStorage.getItem('token');
  }

  ngOnInit() {
    this.getBackup();
  }

  async getBackup() {
    this.loading.show();
    try {
      let rs: any = await this.settingService.getBackupList();
      if (rs.ok) {
        this.loading.hide();
        this.items = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error(JSON.stringify(error));
    }
  }

  async doBackup() {
    this.alertService.confirm('ต้องการสำรองข้อมูล ใช่หรือไม่')
      .then(async () => {
        this.loading.show();
        let rs: any = await this.settingService.backupDatabase();
        this.loading.hide();
        console.log(rs);
        if (rs.ok) {
          this.alertService.success();
          this.getBackup();
        } else {
          this.alertService.error(rs.error);
        }
      }).catch(() => {
        this.loading.hide();
        // no action
      })
  }

  removeFile(i: any) {
    this.alertService.confirm(`ต้องการลบไฟล์นี้ ใช่หรือไม่? [${i.backup_path}]`)
      .then(async () => {
        let rs: any = await this.settingService.removeBackupFile(i.backup_id);
        if (rs.ok) {
          this.alertService.success();
          this.getBackup();
        } else {
          this.alertService.error(rs.error);
        }
      }).catch(() => {
        // no action
      });

  }

  async downloadFile(i: any) {
    let url: any = `${this.apiUrl}/settings/backup/download/${i.backup_id}?token=${this.token}`;
    window.open(url, '_blank');
  }

}
