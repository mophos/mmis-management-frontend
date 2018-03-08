import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class StandardService {

  constructor(
    @Inject('API_PLANNING') private url: string,
    private authHttp: AuthHttp
  ) { }

  getBudgetYear() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/budget-year`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getGeneric() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/generic`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getGenericLocal() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/generic`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getGenericByCatagory(category) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/generic-cat/${category}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getPackage(genericId) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/package/${genericId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getPackageQty(genericId, genericPackage) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/package-qty/${genericId}/${genericPackage}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  checkDuplicateGeneric(
    subBudgetId,
    genericId
  ) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/planning/chack-duplicate`, {
        subBudgetId: subBudgetId,
        genericId: genericId
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getInventoryQty(genericId, genericPackage) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/inventory-qty/${genericId}/${genericPackage}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getEstimateUse(genericId, budgetYear) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/estimate_use/${genericId}/${budgetYear}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getUnitPrice(genericId, genericPackage) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/unit-price/${genericId}/${genericPackage}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getPeople() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/people`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getYears() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/year`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getBudgetList(budgetYear) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/bg-list/${budgetYear}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getPurchasingMethod() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/std/purchasing-method`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
