import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  public token: string;
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) { }

  canActivate() {
    const token = sessionStorage.getItem('token');

    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        const decodedToken = this.jwtHelper.decodeToken(token);
        const accessRight = decodedToken.accessRight;
        if (accessRight) {
          const rights = accessRight.split(',');
          let isAdmin = false;
          if (_.indexOf(rights, 'UM_ADMIN') > -1) {
            isAdmin = true;
          } else {
            isAdmin = false;
          }
          if (isAdmin) {
            return true;
          } else {
            console.log('คุณไม่มีสิทธิ์เข้าใช้งาน module นี้');
            this.router.navigate(['login']);
            return false;
          }
        } else {
          this.router.navigate(['login']);
        }

      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
