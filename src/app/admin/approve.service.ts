import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ApproveService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  getList() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/approve`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getSysModule() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/approve/getSysModule`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/approve/getUser`)
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
      this.authHttp.post(`${this.apiUrl}/approve/save`, {
        data: data
      })
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }

  // all() {
  //   return new Promise((resolve, reject) => {
  //     this.authHttp.get(`${this.apiUrl}/people`)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         resolve(data);
  //       }, error => {
  //         reject(error);
  //       });
  //   });
  // }

  // getTitles() {
  //   return new Promise((resolve, reject) => {
  //     this.authHttp.get(`${this.apiUrl}/people/titles`)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         resolve(data);
  //       }, error => {
  //         reject(error);
  //       });
  //   });
  // }

  // getPositioins() {
  //   return new Promise((resolve, reject) => {
  //     this.authHttp.get(`${this.apiUrl}/people/positions`)
  //       .map(res => res.json())
  //       .subscribe(data => {
  //         resolve(data);
  //       }, error => {
  //         reject(error);
  //       });
  //   });
  // }



  update(data: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/approve/update`, {
        data: data
      })
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }

  remove(data: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/approve/remove/${data.user_id}/${data.action_name}`)
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }

}
