import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(
    private http: Http,
    @Inject('API_URL') private apiUrl: string
  ) { }

  doLogin(username: string, password: string) {
    console.log(this.apiUrl);
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/login`, {
        username: username,
        password: password
      })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }
}
