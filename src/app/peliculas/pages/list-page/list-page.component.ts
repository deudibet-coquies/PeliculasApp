import { Component } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {

  public peliculas: Pelicula[] = []; 

  constructor(private service: PeliculasService) {}

  ngOnInit(): void {
    this.getPeliculas();
  }

  getPeliculas(): void {
    this.service.getpeliculas()
      .subscribe(categorias => this.peliculas = categorias);
  }

}
