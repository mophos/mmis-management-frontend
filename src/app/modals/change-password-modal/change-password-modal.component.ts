import { AlertService } from './../../alert.service';
import { UserService } from './../../admin/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'um-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styles: []
})
export class ChangePasswordModalComponent implements OnInit {

  @Output('onSuccess') onSuccess = new EventEmitter<boolean>();

  password: any = '';
  password2: any;
  open = false;
  isSaving = false;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  openModal() {
    this.open = true;
  }

  chanagePassword() {
    this.isSaving = true;
    this.alertService.confirm('ต้องการเปลี่ยนรหัสผ่าน ใช่หรือไม่?')
      .then(() => {
        this.userService.changePassword(this.password)
          .then((rs: any) => {
            if (rs.ok) {
              this.isSaving = false;
              this.alertService.success();
              this.open = false;
              this.onSuccess.emit(true);
            } else {
              this.isSaving = false;
              this.alertService.error(rs.error);
            }
          })
          .catch((error: any) => {
            this.isSaving = false;
            this.alertService.error(error.message);
          })
      }).catch(() => { });
  }

  closeModal() {
    this.onSuccess.emit(true);
    this.open = false;
    this.password = '';
    this.password2 ='';
  }

}
