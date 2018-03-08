import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApproveService } from "./../approve.service";
import { AlertService } from './../../alert.service';
@Component({
  selector: 'um-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  @ViewChild('wmSearchUser') public wmSearchUser: any;
  openModal = false;
  loading = false;

  list: any = [];
  users: any = []
  modules: any = []

  moduleSelected: any
  userSelected: any

  user_id: any
  username: any
  module_id: any
  action_name: any;
  password: any = ''
  password2: any = ''
  detail: any
  fname: string;
  lname: string;
  changData: boolean
  titel: any

  constructor(
    private alertService: AlertService,
    private approveService: ApproveService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getList()
    // this.getModules()
  }

  getList() {
    this.loading = true;
    this.approveService.getList()
      .then((result: any) => {
        if (result.ok) {
          this.list = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
        this.ref.detectChanges();
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
        this.loading = false;
        this.alertService.serverError();
      })
  }

  // getSysModule() {

  // }

  showModal() {
    this.titel = 'เพิ่ม'
    this.changData = false
    this.openModal = true;
    // this.getModules()
  }

  // getModules() {
  //   this.loading = true;
  //   this.approveService.getSysModule()
  //     .then((result: any) => {
  //       if (result.ok) {
  //         this.modules = result.rows;
  //         if (this.modules) this.action_name = this.modules[0].module_name
  //       } else {
  //         console.log(result.error);
  //         this.alertService.error();
  //       }
  //       this.ref.detectChanges();
  //       this.loading = false;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.loading = false;
  //       this.alertService.serverError();
  //     })
  // }

  getUsers() {
    // this.loading = true;
    // this.approveService.getUser()
    //   .then((result: any) => {
    //     if (result.ok) {
    //       this.users = result.rows;
    //     } else {
    //       console.log(result.error);
    //       this.alertService.error();
    //     }
    //     this.ref.detectChanges();
    //     this.loading = false;
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.loading = false;
    //     this.alertService.serverError();
    //   })
  }

  showEditModal(list: any) {
    this.titel = 'แก้ไข'
    this.changData = true
    if (list) {
      this.detail = list.detail;
      this.action_name = list.action_name;
      this.user_id = list.user_id;
      this.username = list.username
      this.wmSearchUser.setEdit(list.username + ' (' + list.fname + ' ' + list.lname + ')')
      this.openModal = true;
    }
  }

  onUserSelected(event: any) {
    if (event) {
      this.user_id = event.user_id
      this.username = event.username
    }
  }

  save() {
    let moduleSet = this.modules.find((element) => {
      return element.module_name == this.action_name;
    });
    console.log([this.user_id, this.action_name, this.password, moduleSet.module_id]);
    if (this.user_id && this.action_name && this.password && moduleSet.module_id) {
      let data = {
        module_id: moduleSet.module_id,
        action_name: this.action_name,
        password: this.password,
        user_id: this.user_id,
        username: this.username
      }
      let promise;
      let ans = this.list.find((element) => {
        return (element.action_name == data.action_name) && (element.username == data.username);
      });
      if (this.changData || ans) {
        promise = this.approveService.update(data);
      } else {
        promise = this.approveService.save(data);
      }
      promise.then((result: any) => {
        if (result.ok) {
          this.alertService.success();
          this.getList();
          this.openModal = false;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
        .catch((error) => {
          this.alertService.serverError();
          console.log(error);
        })
    } else {
      this.alertService.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
    this.close()
  }

  remove(list: any) {

    if (list.user_id && list.action_name) {
      let data = {
        action_name: list.action_name,
        user_id: list.user_id
      }
      this.alertService.confirm('ต้องลบการ' + list.detail + ' ของ User Name: ' + list.username + ' ใช่หรือไม่?')
        .then((result: any) => {
          this.approveService.remove(data)
            .then((result: any) => {
              if (result.ok) {
                this.alertService.success();
                this.getList();
              } else {
                this.alertService.error();
              }
            })
            .catch((error) => {
              this.alertService.serverError();
            })
        })
        .catch((error) => {

        })
    } else {
      this.alertService.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  close() {
    this.openModal = false
    this.wmSearchUser.clearSelected()
    this.password = ''
    this.password2 = ''
    this.changData = false
  }

}

