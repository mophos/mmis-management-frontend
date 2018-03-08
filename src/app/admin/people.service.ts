import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  all() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/people`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getTitles() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/people/titles`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getPositioins() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/people/positions`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  save(data: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/people`, {
        data: data
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  update(peopleId: string, data: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/people/${peopleId}`, {
        data: data
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  remove(peopleId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/people/${peopleId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
