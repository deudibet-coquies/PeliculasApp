import { Pipe, PipeTransform } from '@angular/core';
import { Pelicula } from '../interfaces/pelicula';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform( hero: Pelicula ): string {

    if ( !hero.id && !hero.rutaImagen ) {
      return 'assets/no-image.png';
    }

    if ( hero.rutaImagen ) return hero.rutaImagen; // https:///google.com/flash.png

    return `assets/heroes/${ hero.id }.jpg`;

  }

}
