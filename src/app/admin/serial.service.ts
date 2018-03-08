import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class SerialService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  getSerial() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/serial`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getSerialFormat() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/serial/format`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getSerialInfo(type) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/serial/info/${type}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  updateSerial(type, formatId, runningNumber) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/serial/${type}`, {
        formatId: formatId,
        runningNumber: runningNumber
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
