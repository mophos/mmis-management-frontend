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
  positionId: any;

  fname: string;
  lname: string;

  constructor(
    private alertService: AlertService,
    private peopleService: PeopleService,
    private ref: ChangeDetectorRef
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
    this.positionId = null;
    this.titleId = null;
    this.openModal = true;
  }

  showEditModal(people) {
    this.fname = people.fname;
    this.lname = people.lname;
    this.positionId = people.position_id;
    this.titleId = people.title_id;
    this.peopleId = people.people_id;
    this.openModal = true;
  }

  save() {
    if (this.titleId && this.positionId && this.fname && this.lname) {
      let data = {
        titleId: this.titleId,
        positionId: this.positionId,
        fname: this.fname,
        lname: this.lname
      }

      let promise;
      
      if (this.peopleId) {
        promise = this.peopleService.update(this.peopleId, data);
      } else {
        promise = this.peopleService.save(data);
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

}
