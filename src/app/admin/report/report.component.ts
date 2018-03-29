import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ReportService } from '../report.service'
import { AlertService } from '../../alert.service'

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
    let rs = await this.reportService.getReport();
    if (rs.ok) {
      this.list = rs.rows;
      this.loading = false;
    } else {
      this.loading = false;
      this.alertService.error(rs.error);
    }
  }

  switchActive(event: any, l: any) {
    this.loading = true;
    this.reportService.setActive(l.id, event.target.checked ? 'Y' : 'N', l.report_type)
      .then((results: any) => {
        this.loading = false;
        this.alertService.success();
        this.getList();
      })
      .catch((error) => {
        this.loading = false;
        this.alertService.error(error);
      })
  }

  showReport(id) {
    const reportUrl = this.apiUrl + `/report/purchase-order/${id}?token=${this.token}`;
    this.htmlPreview.showReport(reportUrl);
  }
}