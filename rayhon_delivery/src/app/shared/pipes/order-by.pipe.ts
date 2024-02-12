import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(sortedItems: any[], type: string): any {
    console.log(sortedItems);
    console.log(sortedItems.sort((a, b) => a[type] - b[type]));
    return sortedItems.sort((a, b) => a[type] - b[type]);
  }

}
