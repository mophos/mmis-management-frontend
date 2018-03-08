import { AlertService } from './../../alert.service';
import { GroupService } from './../group.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'um-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  openModalGroup = false;
  groupName: string;
  groupId: string;
  groups: any = [];
  loading = false;

  constructor(
    private groupService: GroupService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getGroupList();
  }

  getGroupList() {
    this.loading = true;
    this.groupService.all()
      .then((result: any) => {
        if (result.ok) {
          this.groups = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
        this.ref.detectChanges();
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
        this.alertService.serverError();
      })
  }

  saveGroup() {
    if (this.groupName) {
      let promise;
      if (this.groupId) {
        promise = this.groupService.update(this.groupId, this.groupName)
      } else {
        promise = this.groupService.save(this.groupName);
      }

      promise.then((result: any) => {
        if (result.ok) {
          this.alertService.success();
          this.openModalGroup = false;
          this.getGroupList();
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
        .catch(error => {
          console.log(error);
          this.alertService.serverError();
        });
    } else {
      this.alertService.error('กรุณาระบุชื่อกลุ่ม');
    }
  }

  edit(group) {
    this.groupId = group.group_id;
    this.groupName = group.group_name;

    this.openModalGroup = true;
  }

  remove(group) {
    this.alertService.confirm('คุณต้องการลบรายการนี้ [' + group.group_name + '] ใช่หรือไม่?')
      .then(() => {
        this.groupService.remove(group.group_id)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.getGroupList();
            } else {
              console.log(result.error);
              this.alertService.error();
            }
          })
          .catch((error) => {
            this.alertService.serverError();
            console.log(error);
          })
      }).catch(() => { });
  }

}
