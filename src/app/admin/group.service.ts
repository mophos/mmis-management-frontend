import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private authHttp: AuthHttp
  ) { }

  all() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/groups`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  save(groupName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/groups`, {
        groupName: groupName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getRights(groupId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/groups/rights/${groupId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  saveRights(rights: any[], groupId: string, groupName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/groups/rights/${groupId}`, {
        rights: rights,
        groupName: groupName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }


  update(groupId: any, groupName: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.apiUrl}/groups/${groupId}`, {
        groupName: groupName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  remove(groupId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/groups/${groupId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
