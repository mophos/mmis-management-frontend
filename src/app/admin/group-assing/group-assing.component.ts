import { GroupService } from './../group.service';
import { AlertService } from './../../alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'um-group-assing',
  templateUrl: './group-assing.component.html',
  styleUrls: ['./group-assing.component.css']
})
export class GroupAssingComponent implements OnInit {

  selectedRights: any = [];
  rights: any = [];
  groupId: string;
  groupName: string;
  submitLoading = false;

  constructor(
    private groupService: GroupService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.groupId = this.route.snapshot.params.groupId;
  }

  ngOnInit() {
    this.getRights();
  }

  getRights() {
    this.groupService.getRights(this.groupId)
      .then((result: any) => {
        if (result.ok) {
          if (result.groupName) {
            let _groupRights = result.rows;
            this.rights = result.rights;
            this.groupName = result.groupName;

            this.rights.forEach(v => {
              _groupRights.forEach(x => {
                if (x.right_id === v.right_id) {
                  this.selectedRights.push(v);
                }
              });
            });
          } else {
            this.router.navigate(['/admin/groups']);
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.alertService.serverError();
      });
  }


  saveRights() {
    if (this.groupId && this.groupName && this.selectedRights.length) {
      let rights = [];
      this.selectedRights.forEach(v => {
        rights.push(v.right_id);
      });
      this.submitLoading = true;
      this.groupService.saveRights(rights, this.groupId)
        .then((result: any) => {
          if (result.ok) {
            this.alertService.success();
            this.router.navigate(['/admin/groups']);
          } else {
            console.log(result.error);
            this.alertService.error();
          }
          this.submitLoading = false;
        })
        .catch(error => {
          this.submitLoading = false;
          console.log(error);
          this.alertService.serverError();
        });

    } else {
      this.alertService.error('กรุณาระบุข้อมูลให้ครบถ้วน');
    }
  }

}
