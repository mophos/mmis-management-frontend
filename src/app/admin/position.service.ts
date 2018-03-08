import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class PositionService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  all() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/positions`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  save(positionName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/positions`, {
        positionName: positionName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  update(positionId: any, positionName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/positions/${positionId}`, {
        positionName: positionName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  remove(positionId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/positions/${positionId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
