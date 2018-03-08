import { TitleService } from './../title.service';
import { AlertService } from './../../alert.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'um-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent implements OnInit {

  openModal = false;
  titleName: string;
  titleId: string;
  titles: any = [];
  loading = false;

  constructor(
    private titleService: TitleService,
    private alertService: AlertService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getList();
  }

  showModal() {
    this.titleId = null;
    this.titleName = null;

    this.openModal = true;
  }

  getList() {
    this.loading = true;
    this.titleService.all()
      .then((result: any) => {
        if (result.ok) {
          this.titles = result.rows;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
        this.ref.detectChanges();
        this.loading = false;
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
        this.alertService.serverError();
      });
  }

  save() {
    if (this.titleName) {
      let promise: any;
      if (this.titleId) {
        promise = this.titleService.update(this.titleId, this.titleName);
      } else {
        promise = this.titleService.save(this.titleName);
      }

      promise.then((result: any) => {
        if (result.ok) {
          this.alertService.success();
          this.getList();
          this.titleId = null;
          this.openModal = false;
        } else {
          console.log(result.error);
          this.alertService.error();
        }
      })
        .catch(error => {
          console.log(error);
          this.alertService.serverError();
        });
    }
  }

  remove(title: any) {
    this.alertService.confirm('คุณต้องการลบรายการนี้ [' + title.title_name + '] ใช่หรือไม่?')
      .then(() => {
        this.titleService.remove(title.title_id)
          .then((result: any) => {
            if (result.ok) {
              this.alertService.success();
              this.getList();
            } else {
              console.log(result.error);
              this.alertService.error();
            }
          })
          .catch(error => {
            console.log(error);
            this.alertService.serverError();
          });
      })
      .catch(() => { });
  }

  edit(title: any) {
    this.titleId = title.title_id;
    this.titleName = title.title_name;
    this.openModal = true;
  }

}
