import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class BudgetTypeService {

  constructor(
    @Inject('API_PLANNING') private url: string,
    private authHttp: AuthHttp
  ) { }

  getBudgetType() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/bg-type`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  insertBudgetType(typeName) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/bg-type`, {
        typeName: typeName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  updateBudgetType(typeId, typeName) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.url}/bg-type/${typeId}`, {
        typeName: typeName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  deleteBudgetType(typeId) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.url}/bg-type/${typeId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getBudgetTypePeople() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/bg-type/people`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
