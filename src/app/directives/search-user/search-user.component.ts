
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'um-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input('clearOnSelected') clearOnSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('changData') changData: EventEmitter<boolean> = new EventEmitter<boolean>();
  // set setEdit(event: any) {
  //   console.log(event);
  //   // if (event) {
  //   //   this.query = event
  //   // }
  // }

  userName: any
  token: any;
  datasource: any;
  query: any = null;
  userApiUrl: any

  constructor(@Inject('API_URL') private apiUrl: string) {
    this.token = sessionStorage.getItem('token');
    this.userApiUrl = `${this.apiUrl}/approve/autocomplete?token=${this.token}`;
  }

  setEdit(event: any) {
    if (event) {
      this.query = event
    }
  }

  ngOnInit() {

  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    if (this.clearOnSelected) {
      this.query = null;
    } else {
      this.query = event ? event.fullname : null;
    }
  }

  onClearSelected(event: any) {
    if (this.clearOnSelected) {
      if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        this.onChange.emit(true);
      } else {
        this.onChange.emit(false);
      }
    }
  }

  clearSelected() {
    this.query = null;
  }

}
