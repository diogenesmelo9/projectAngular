import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actInact'
})
export class ActInactPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value === true) {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }
}
