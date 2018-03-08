import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class RightService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  all() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/rights`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  save(rightName: string, rightCode: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/rights`, {
        rightName: rightName,
        rightCode: rightCode
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  update(rightId: any, rightName: string, rightCode: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/rights/${rightId}`, {
        rightName: rightName,
        rightCode: rightCode
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  remove(rightId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/rights/${rightId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
