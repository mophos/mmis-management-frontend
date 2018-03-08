import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class TitleService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  all() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/titles`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  save(titleName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/titles`, {
        titleName: titleName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  update(titleId: any, titleName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/titles/${titleId}`, {
        titleName: titleName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  remove(titleId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/titles/${titleId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
