import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ReportService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  async getReport() {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/report`).toPromise();
    return rs.json();
  }

  async setActive(reportId, reportDetailId) {
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/active`, {
      reportId: reportId,
      reportDetailId: reportDetailId
    }).toPromise();
    return rs.json();
  }

  async setDisActive(reportId) {
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/disactive`, {
      reportId: reportId
    }).toPromise();
    return rs.json();
  }
  async setActiveSignature(reportDetailId,status) {
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/activeSignature`, {
      reportDetailId: reportDetailId,
      status:status
    }).toPromise();
    return rs.json();
  }

  async setLine(reportDetailId, line) {
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/line`, {
      reportDetailId: reportDetailId,
      line: line
    }).toPromise();
    return rs.json();
  }
}
