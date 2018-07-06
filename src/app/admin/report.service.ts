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
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/active/${reportId}/${reportDetailId}`, {}).toPromise();
    return rs.json();
  }

  async setDisActive(reportId) {
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/disactive/${reportId}`, {}).toPromise();
    return rs.json();
  }
}
