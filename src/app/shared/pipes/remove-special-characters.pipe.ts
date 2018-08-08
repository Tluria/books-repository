import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialCharacters'
})
export class RemoveSpecialCharactersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/[^\w\s]/gi, '');
  }

}
