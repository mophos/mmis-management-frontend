import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toThaiDateTime'
})
export class ToThaiDateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (moment(value, 'YYYY-MM-DD').isValid()) {
      const thaiDate = `${moment(value).format('DD/MM')}/${moment(value).get('year') + 543}  ${moment(value).format('HH:mm:ss')} น.`;
      return thaiDate;
    } else {
      return '-';
    }
  }
}
