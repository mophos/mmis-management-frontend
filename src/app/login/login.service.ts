import { Http, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    @Inject('API_URL') private apiUrl: string
  ) { }

  doLogin(username: string, password: string, userWarehouseId) {
    console.log(this.apiUrl);
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/login`, {
        username: username,
        password: password,
        userWarehouseId: userWarehouseId,
        supportLoginSteps: true
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  searchWarehouse(username: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.apiUrl}/login/warehouse/search?username=${username}`)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  /**
   * ขั้นตอนหลังตรวจรหัสผ่านทุกตัวใช้ preAuthToken แทน token จริง
   * preAuthToken มีอายุ 15 นาที และใช้เรียก API อื่นของระบบไม่ได้
   */
  private postWithPreAuth(path: string, preAuthToken: string, body: any = {}) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${preAuthToken}`
    });

    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}${path}`, body, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

  changePassword(preAuthToken: string, password: string, confirmPassword: string) {
    return this.postWithPreAuth('/login/change-password', preAuthToken, {
      password: password,
      confirmPassword: confirmPassword
    });
  }

  setup2fa(preAuthToken: string) {
    return this.postWithPreAuth('/login/2fa/setup', preAuthToken);
  }

  confirm2fa(preAuthToken: string, code: string) {
    return this.postWithPreAuth('/login/2fa/confirm', preAuthToken, { code: code });
  }

  verify2fa(preAuthToken: string, code: string) {
    return this.postWithPreAuth('/login/2fa/verify', preAuthToken, { code: code });
  }
}
