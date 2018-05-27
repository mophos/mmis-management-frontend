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

  async setActive(id, active, type) {
    const rs: any = await this.authHttp.put(`${this.apiUrl}/report/active/${id}/${active}/${type}`, {}).toPromise();
    return rs.json();
  }
}
