import { Pipe, PipeTransform } from '@angular/core';
import { Clasificacion } from '../interfaces/Categoria';

@Pipe({
  name: 'valueById'
})
export class ValueByIdPipe implements PipeTransform {

  transform(id: number, array: Clasificacion[] | any): string {
    
    if (!Array.isArray(array) || !id) {
      return '';
    }
    const item = array.find(item => item.id === id);
    console.log({id,array,item});
    return item ? item.nombre || item.value : null;

  }
}
