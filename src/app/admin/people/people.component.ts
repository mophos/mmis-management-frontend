import { PositionService } from './../position.service';
import { PeopleService } from './../people.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'um-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  openModal = false;
  people: any = [];
  loading = false;

  peopleName: string;
  peopleId: any;
  titles: any = [];
  positions: any = [];
  titleId: any;
  positionId: any = 'null';
  positionIdOld: any;

  fname: string;
  lname: string;
  openModalLogs = false;
  logs = [];
  constructor(
    private alertService: AlertService,
    private peopleService: PeopleService,
    private ref: ChangeDetectorRef,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.getList();
    this.getTitles();
    this.getPositions();
  }

  getList() {
    this.loading = true;
    this.peopleService.all()
      .then((result: any) => {
        if (result.ok) {
          this.people = result.rows;
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

  getPositions() {
    this.peopleService.getPositioins()
      .then((result: any) => {
        this.positions = result.rows;
      });
  }

  getTitles() {
    this.peopleService.getTitles()
      .then((result: any) => {
        this.titles = result.rows;
      });
  }

  showModal() {
    this.fname = null;
    this.lname = null;
    this.positionId = 'null';
    this.titleId = null;
    this.peopleId = null;
    this.openModal = true;
  }

  showEditModal(people) {
    this.fname = people.fname;
    this.lname = people.lname;
    this.positionId = people.position_id;
    this.positionIdOld = people.position_id;
    this.titleId = people.title_id;
    this.peopleId = people.people_id;
    this.openModal = true;
  }

  async save() {
    if (this.titleId && this.positionId && this.fname && this.lname) {
      let rs;
      if (this.positionId === 'null') {
        this.positionId = null;
      }
      if (this.peopleId) {
        const dataUpdate = {
          titleId: this.titleId,
          fname: this.fname,
          lname: this.lname
        }
        if (+this.positionId === +this.positionIdOld) {
          rs = await this.peopleService.update(this.peopleId, dataUpdate);
        } else {
          if (this.positionId != null) {
            const dataPosition = {
              people_id: this.peopleId,
              position_id: this.positionId
            }
            rs = await this.positionService.editUserPosition(dataPosition);
          }
        }
      } else {
        const dataNew = {
          titleId: this.titleId,
          fname: this.fname,
          lname: this.lname,
          position_id: this.positionId
        }
        rs = await this.peopleService.save(dataNew);
      }
      if (rs.ok) {
        this.alertService.success();
        this.getList();
        this.openModal = false;
      } else {
        console.log(rs.error);
        this.alertService.error();
      }
    } else {
      this.alertService.error('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  remove(people) {
    this.alertService.confirm(`คุณต้องการลบราการนี้ [${people.fname} ${people.lname}] ใช่หรือไม่?`)
      .then(() => {
        this.peopleService.remove(people.people_id)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.getList();
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

  async openLogs(u) {
    try {
      const rs: any = await this.positionService.log(u.people_id);
      if (rs.ok) {
        this.logs = rs.rows;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();

    }
    this.openModalLogs = true;
  }
}
