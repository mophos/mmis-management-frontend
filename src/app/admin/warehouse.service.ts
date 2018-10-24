import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class WarehouseService {

  constructor(
    @Inject('API_URL') private url: string,
    private authHttp: AuthHttp
  ) { }

  update(warehouseId: any, warehouseName: string, shortCode: string, location: string, isActived: string, isReceive: string, isUnitIssue: string, hospcode: any, depCode: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.put(`${this.url}/warehouses/${warehouseId}`, {
        warehouseName: warehouseName,
        shortCode: shortCode,
        location: location,
        isActived: isActived,
        isReceive: isReceive,
        isUnitIssue: isUnitIssue,
        hospcode: hospcode,
        depCode: depCode
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  save(warehouseName: string, shortCode: string, location: string, isActived: string, isReceive: string, isUnitIssue: string, hospcode: any, depCode: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.url}/warehouses`, {
        warehouseName: warehouseName,
        shortCode: shortCode,
        location: location,
        isActived: isActived,
        isReceive: isReceive,
        isUnitIssue: isUnitIssue,
        hospcode: hospcode,
        depCode: depCode
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  allSearch(query:any) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.url}/warehouses/search?query=${query}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  remove(warehouseId: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.url}/warehouses/${warehouseId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
