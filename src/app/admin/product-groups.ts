import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductGroupService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  async list() {
    const rs: any = await this.authHttp.get(`${this.apiUrl}/product-groups`).toPromise();
    return rs.json();
  }
}
