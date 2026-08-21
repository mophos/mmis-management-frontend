import { Router } from '@angular/router';
import { AlertService } from './../../alert.service';
import { UserService } from './../user.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'um-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any = [];
  logs: any = [];
  loading = false;
  loadingSwitch = false;
  openModalSwitchUser = false;
  openModalActionLogs = false;
  userSwitchings = [];
  loadingLogs = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  getUsers() {
    this.loading = true;
    this.userService.all()
      .then((result: any) => {
        this.loading = false;
        if (result.ok) {
          this.users = result.rows;
          this.ref.detectChanges();
        } else {
          this.alertService.error();
        }
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
        this.alertService.serverError();
      });
  }

  remove(user) {
    this.alertService.confirm('คุณต้องการลบ [' + user.fullname + ']')
      .then(() => {
        this.userService.removeUser(user.user_id)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.getUsers();
            } else {
              console.log(result.error);
              this.alertService.error();
            }
          })
          .catch((error) => {
            this.alertService.serverError();
          });
      })
      .catch(() => { });
  }

  edit(user) {
    this.router.navigate(['/admin/users/edit', user.user_id])
  }

  ngOnInit() {
    this.getUsers();
  }

  openSwitchUsers(user: any) {
    this.loadingSwitch = true;
    this.userService.getSwitchLogs(user.user_id)
      .then((result: any) => {
        if (result.ok) {
          this.userSwitchings = result.rows;
          this.openModalSwitchUser = true;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
  }

  openActionLogs(user: any) {
    this.loadingLogs = true;
    this.logUsername = user.username;
    this.logUserId = user.user_id;
    this.userService.getActionLogs(user.user_id)
      .then((result: any) => {
        if (result.ok) {
          this.logs = result.rows;
          this.openModalActionLogs = true;
          // โหลดพร้อมกันตอนเปิดโมดัล ไม่ผูกกับการคลิกแท็บ
          // เพราะถ้ารอคลิก แท็บจะว่างแวบหนึ่งทุกครั้งที่เปิด
          this.loadTrustedDevices();
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
  }

  // ----- อุปกรณ์ที่จำไว้ -----

  logUserId: any = null;
  trustedDevices: any[] = [];
  trustedDeviceAvailable = true;
  loadingDevices = false;

  /** ยังไม่หมดอายุและใช้งานได้จริงกี่เครื่อง */
  get activeDeviceCount(): number {
    return this.trustedDevices.filter(d => !d.is_expired).length;
  }

  loadTrustedDevices() {
    if (!this.logUserId) { return; }

    this.loadingDevices = true;
    this.trustedDevices = [];

    this.userService.getTrustedDevices(this.logUserId)
      .then((result: any) => {
        this.loadingDevices = false;

        if (result.ok) {
          this.trustedDevices = result.rows || [];
          // available = false แปลว่ายังไม่ได้รัน SQL ของฟีเจอร์นี้ ไม่ใช่ error
          this.trustedDeviceAvailable = result.available !== false;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
      .catch(() => {
        this.loadingDevices = false;
        this.alertService.error();
      });
  }

  /**
   * sweetalert2 v6 ที่โปรเจกต์นี้ใช้จะ "reject" เมื่อผู้ใช้กดยกเลิก ไม่ใช่ resolve เป็น false
   * จึงต้องเขียนแบบ .then() ตามที่หน้าอื่นในโปรเจกต์ทำ และปิดท้ายด้วย .catch()
   * เพื่อไม่ให้การกดยกเลิกกลายเป็น unhandled rejection
   */
  revokeTrustedDevices() {
    if (!this.logUserId || !this.trustedDevices.length) { return; }

    this.alertService.confirm('เพิกถอนอุปกรณ์ที่จำไว้ทั้งหมด? ผู้ใช้จะต้องกรอกรหัส 6 หลักอีกครั้งในทุกเครื่อง')
      .then(() => {
        this.userService.revokeTrustedDevices(this.logUserId)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.loadTrustedDevices();
            } else {
              console.log(result.error);
              this.alertService.error(result.error);
            }
          })
          .catch(() => this.alertService.error());
      })
      .catch(() => { /* ผู้ใช้กดยกเลิก ไม่ต้องทำอะไร */ });
  }

  // ----- ประวัติการใช้งาน -----

  logUsername: string = null;

  /**
   * แปลง action ในฐานข้อมูลเป็นข้อความภาษาไทย
   * ค่าที่ไม่รู้จักคืนค่าเดิมกลับไป เพื่อไม่ให้ log เก่าหรือ action ใหม่ที่เพิ่มทีหลังหายไปจากตาราง
   */
  actionLabel(action: string): string {
    const labels = {
      LOGIN: 'เข้าสู่ระบบสำเร็จ',
      LOGIN_PENDING: 'รหัสผ่านถูกต้อง รอทำขั้นตอนต่อ',
      LOGIN_FAIL: 'เข้าสู่ระบบไม่สำเร็จ',
      ACCOUNT_LOCKED: 'บัญชีถูกระงับ',
      ACCOUNT_UNLOCK: 'ผู้ดูแลปลดล็อกบัญชี',
      CHANGE_PASSWORD: 'เปลี่ยนรหัสผ่าน',
      '2FA_SETUP': 'ขอ QR ตั้งค่า 2FA',
      '2FA_CONFIRM': 'ตั้งค่า 2FA สำเร็จ',
      '2FA_VERIFY_FAIL': 'กรอกรหัส OTP ไม่ถูกต้อง',
      '2FA_RESET': 'ผู้ดูแลล้างค่า 2FA',
      LOGIN_TRUSTED: 'เข้าสู่ระบบสำเร็จ (เครื่องที่จำไว้)',
      TRUSTED_DEVICE_REVOKE: 'ผู้ดูแลเพิกถอนอุปกรณ์ที่จำไว้'
    };

    return labels[action] || action;
  }

  /** action ที่บ่งบอกความผิดปกติ ใช้เน้นสีให้กวาดตาเจอง่าย */
  isFailedAction(action: string): boolean {
    return ['LOGIN_FAIL', '2FA_VERIFY_FAIL', 'ACCOUNT_LOCKED'].indexOf(action) > -1;
  }
}
