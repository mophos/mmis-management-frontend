import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  all() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/all`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getWarehousesList() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/warehouses-list`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getGroupsList() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/groups-list`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getRightsList() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/rights-list`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  saveUser(data: any, rights) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/users`, {
        data: data,
        rights: rights
      })
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }

  updateUser(data: any, rights, userId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/users/${userId}`, {
        data: data,
        rights: rights
      })
        .map(res => res.json())
        .subscribe(d => {
          resolve(d);
        }, error => {
          reject(error);
        });
    });
  }

  removeUser(userId: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/users/${userId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getDetail(userId: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/${userId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getPeoplesList() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/people/list`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getActionLogs(userId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/action-logs/${userId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getSwitchLogs(userId: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/switch-logs/${userId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  async changePassword(password: any) {
    const res = await this.authHttp.post(`${this.apiUrl}/users/change-password`, {
      password: password
    }).toPromise();
    return res.json()
  }

  getRight(module: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/rights/module?module=${module}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
