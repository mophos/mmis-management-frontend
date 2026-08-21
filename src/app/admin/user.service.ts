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

  // ----- เครื่องมือความปลอดภัยสำหรับผู้ดูแลระบบ -----
  // ทั้งสามตัวมีผลกับฐานข้อมูลทันทีที่เรียก ไม่ต้องกดบันทึกซ้ำ
  // หน้าจอจึงต้องถามยืนยันก่อนเสมอ

  private postAction(userId: any, action: string) {
    return new Promise((resolve, reject) => {
      this.authHttp.post(`${this.apiUrl}/users/${userId}/${action}`, {})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  /** ล้างค่า 2FA — ผู้ใช้จะต้องสแกน QR ใหม่ในการเข้าสู่ระบบครั้งถัดไป */
  reset2fa(userId: any) {
    return this.postAction(userId, 'reset-2fa');
  }

  /** ปลดล็อกบัญชีที่ถูกระงับจากการกรอกผิดเกินกำหนด โดยไม่ต้องรอครบเวลา */
  unlockAccount(userId: any) {
    return this.postAction(userId, 'unlock');
  }

  /** บังคับให้ผู้ใช้เปลี่ยนรหัสผ่านในการเข้าสู่ระบบครั้งถัดไป (รหัสเดิมยังใช้เข้าได้) */
  forceChangePassword(userId: any) {
    return this.postAction(userId, 'force-change-password');
  }

  /**
   * รายการอุปกรณ์ที่ผู้ใช้สั่งให้จำไว้ (ข้าม OTP ได้)
   * ถ้าฐานข้อมูลยังไม่ได้รัน migration ของฟีเจอร์นี้ backend จะตอบ available = false
   */
  getTrustedDevices(userId: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/${userId}/trusted-devices`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  /** เพิกถอนอุปกรณ์ที่จำไว้ทั้งหมด — ผู้ใช้จะต้องกรอก OTP อีกครั้งทุกเครื่อง */
  revokeTrustedDevices(userId: any) {
    return new Promise((resolve, reject) => {
      this.authHttp.delete(`${this.apiUrl}/users/${userId}/trusted-devices`)
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

  getRight(module: string, warehouseTypeId = null) {
    return new Promise((resolve, reject) => {
      this.authHttp.get(`${this.apiUrl}/users/rights/module?module=${module}&warehouseTypeId=${warehouseTypeId}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
