import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingService {
  tokenKey = sessionStorage.getItem('token');

  constructor(
    @Inject('API_URL') private apiUrl: string,
    @Inject('API_CONTRACT') private apiContract: any,
    private authHttp: AuthHttp
  ) { }

  getSetting() {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/settings`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  getSysSetting(actionName) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/settings/get-sys-setting`, {
        actionName: actionName
      })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
    });
  }

  save(data: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/settings`, {
        data: data
      })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
    });
  }

  saveSetting(varName, dataValue) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/settings/save-settings`, {
        varName: varName,
        dataValue: dataValue
      })
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
    });
  }

// PurchasingOfficer =====================================
  selectData(tableName, selectText, whereText, groupBy, orderText) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/selectData`, {
        tableName: tableName,
        selectText: selectText,
        whereText: whereText,
        groupBy: groupBy,
        orderText: orderText,
        tokenKey: this.tokenKey
      } )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
  getPurchasingOfficer(ref) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/getPurchasingOfficer`, {
        tokenKey: this.tokenKey,
        ref: ref
      } )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  savePurchasingOfficer(ref, formInput) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/savePurchasingOfficer`, {
        tokenKey: this.tokenKey,
        ref: ref,
        data: formInput,
      } )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  deletePurchasingOfficer(ref) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/deletePurchasingOfficer`, {
        tokenKey: this.tokenKey,
        ref: ref
      } )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

// type bid =====================================
  deleteTypeBid(ref) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/delete-type-bid`, {
        tokenKey: this.tokenKey,
        ref: ref
      } )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  saveBidProcess(ref, data) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/save-bid-process`, {
        tokenKey: this.tokenKey,
        data: data,
        ref: ref
      } )
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
    });
  }

  deleteBidProcess(ref) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/delete-bid-process`, {
        tokenKey: this.tokenKey,
        ref: ref
      } )
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  saveTypeBid(ref, data) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiContract}/save-type-bid`, {
        tokenKey: this.tokenKey,
        data: data,
        ref: ref
      } )
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(error);
        });
    });
  }



}
