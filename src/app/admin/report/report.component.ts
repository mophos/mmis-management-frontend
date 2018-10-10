import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ReportService } from '../report.service'
import { AlertService } from '../../alert.service'
import * as _ from 'lodash';
@Component({
  selector: 'um-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('htmlPreview') public htmlPreview: any;
  token: any;

  loading = false;

  list: any = [];
  opened = false;
  url: any;
  isActive: any;

  constructor(
    private reportService: ReportService,
    private alertService: AlertService,
    @Inject('API_URL') private apiUrl: string
  ) {
    this.token = sessionStorage.getItem('token')
  }

  ngOnInit() {
    this.getList();
  }

  async getList() {
    this.loading = true;
    const rs = await this.reportService.getReport();
    if (rs.ok) {
      this.list = rs.rows;
      console.log(this.list);

      this.loading = false;
    } else {
      this.loading = false;
      this.alertService.error(rs.error);
    }
  }

  async switchActive(event: any, detail: any) {
    try {
      this.loading = true;
      let rs: any;
      if (!event.target.checked) {
        rs = await this.reportService.setDisActive(detail.report_detail_id);
      } else {
        const idx = _.findIndex(this.list, { 'report_id': detail.report_id });
        if (idx > -1) {
          for (const v of this.list[idx].details) {
            if (detail.report_detail_id !== v.report_detail_id) {
              v.is_active = 'N;'
            }
          }
        }
        rs = await this.reportService.setActive(detail.report_id, detail.report_detail_id)
      }
      if (rs.ok) {
        this.loading = false;
        this.alertService.success();
        this.getList();
      } else {
        this.loading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }
  async switchSignature(event: any, detail: any) {
    try {
      this.loading = true;
      let rs: any;
      console.log(event.target.checked);
      
      if (!event.target.checked) {
        rs = await this.reportService.setActiveSignature(detail.report_detail_id,'N');
      } else {
        rs = await this.reportService.setActiveSignature(detail.report_detail_id,'Y')
      }
      if (rs.ok) {
        this.loading = false;
        this.alertService.success();
        this.getList();
      } else {
        this.loading = false;
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.loading = false;
      this.alertService.error(error);
    }
  }

  showReport(name) {
    const url = name.split(',');
    this.url = [];
    url.forEach(v => {
      this.url.push(this.apiUrl + `/report_picture/${v}`);
    });
    this.opened = true;
  }

  async changeLine(reportDetailId, value) {
    try {
      await this.reportService.setLine(reportDetailId, value)
    } catch (error) {
      console.log(error);
      this.alertService.error(error);
    }

  }
}
