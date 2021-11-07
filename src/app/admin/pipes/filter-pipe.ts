import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], fieldName: string, text: string): any {
        if (!items || !text) {
            return items;
        }
        return items.filter(item => {
            if (item && typeof(item[fieldName]) != undefined) {
              return item[fieldName] == text;
            }
            return false;
          });
    }
}