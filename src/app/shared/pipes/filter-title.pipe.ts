import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTitle'
})
export class FilterTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const words = value.split(' ');
    let newWords = [];

    for (let char of words) {
      const c = char.toLowerCase() 
      newWords.push(c.charAt(0).toUpperCase() + c.slice(1));
    }

    return newWords.join(' ').replace(/[^\w\s]/gi, '');
  }
}
