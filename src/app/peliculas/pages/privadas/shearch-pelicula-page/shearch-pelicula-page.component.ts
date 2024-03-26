import { Component, OnInit } from '@angular/core';
//import { FormControl } from '@angular/forms';
import { Pelicula } from '../../../interfaces/pelicula';
import { PeliculasService } from '../../../services/peliculas.service';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-shearch-pelicula-page',
  templateUrl: './shearch-pelicula-page.component.html',
  styleUrl: './shearch-pelicula-page.component.css'
})
export class ShearchPeliculaPageComponent implements OnInit {
  public peliculas: Pelicula[] = [];
  public mySearchInput = new FormControl<string>('');
  public peliculasSelected?: Pelicula;
  // public options: Pelicula[] = this.peliculas;
  // filteredOptions: Observable<Pelicula[]> = of([]);

  constructor(private service: PeliculasService) { }

  getPeliculas(mySearchInput: string): void {
    this.service.getpeliculasSearch(mySearchInput)
      .subscribe(peliculas => this.peliculas = peliculas);
  }

  searchPelicula() {
    const value: string = this.mySearchInput.value || '';
    this.getPeliculas(value);
  }

  onSelectedOption(event: MatAutocompleteActivatedEvent) {
    console.log('evento', event);
    if (!event.option?.value) {
      this.peliculasSelected = undefined;
      return
    }

    const pelicula:Pelicula = event.option?.value;
    this.mySearchInput.setValue( pelicula.nombre );
    this.peliculasSelected = pelicula;
  }

  ngOnInit() {
    // this.filteredOptions = this.mySearchInput.valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     const nombre = typeof value === 'string' ? value : value?.nombre;
    //     return nombre ? this._filter(nombre as string) : this.options.slice();
    //   }),
    // );   
  }


  // displayFn(pelicula: Pelicula): string {
  //   return pelicula && pelicula.nombre ? pelicula.nombre : '';
  // }
  // private _filter(nombre: string): Pelicula[] {
  //   const filterValue = nombre.toLowerCase();
  //   return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  // }


}
