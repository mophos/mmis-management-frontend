import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HolidayService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }
  getHolidays() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/holiday`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
  getType() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/holiday/type`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
  updateActive(id, active) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/holiday/active/${id}/${active}`, {})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
  editHoliday(id, data) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/holiday`, { id: id, data: data })
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }
  addHoliday(data) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/holiday`, { 'data': data })
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }
  deleteHoliday(id) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/holiday?id=${id}`)
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }
}
