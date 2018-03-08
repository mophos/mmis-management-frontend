import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateHoliday'
})
export class DateHolidayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    moment.locale('th');
    if (moment(value, 'YYYY-MM-DD').isValid()) {
      // if(moment(value).get('year') <= 2000){
      //   const thaiDate = `${moment(value).format('DD MMMM')}`;
      //   return thaiDate;
      // } else {
      let thaiDate;
      if (moment(value).get('year') == 2000) {
        thaiDate = `${moment(value).format('DD MMMM ')}`;
      } else {
        thaiDate = `${moment(value).format('DD MMMM ')}${moment(value).get('year') + 543}`;
      }
      return thaiDate;
      // }
    } else {
      return '-';
    }
  }

}


