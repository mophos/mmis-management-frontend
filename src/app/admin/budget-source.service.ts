import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class BudgetSourceService {

  constructor(
    @Inject('API_PLANNING') private url: string,
    private authHttp: AuthHttp
  ) { }

  getBudgetSource() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/bg-source`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  insertBudgetSource(budgetSourceName) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/bg-source`, {
        budgetSourceName: budgetSourceName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  updateBudgetSource(budgetSourceId, budgetSourceName) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.url}/bg-source/${budgetSourceId}`, {
        budgetSourceName: budgetSourceName
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  deleteBudgetSource(budgetSourceId) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.url}/bg-source/${budgetSourceId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
