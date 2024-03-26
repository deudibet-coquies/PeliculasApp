import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService } from '../../../services/peliculas.service';
import { Categoria } from '../../../interfaces/Categoria';
import { Pelicula } from '../../../interfaces/pelicula';

@Component({
  selector: 'app-pelicula-public-page',
  templateUrl: './pelicula-public-page.component.html',
  styleUrl: './pelicula-public-page.component.css'
})
export class PeliculaPublicPageComponent implements OnInit {

  public categorias: Categoria[] = [];
  public peliculas: Pelicula[] = [];   

  constructor(
    private service: PeliculasService,
    private router: Router,) { }
  ngOnInit(): void {
    this.getCategorias();
    this.getPeliculas();
  }

  onlogin(): void {
    this.router.navigate(['/auth/login'])
  }


  getCategorias(): void {
    this.service.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }

  getPeliculas(): void {
    this.service.getpeliculas()
      .subscribe(categorias => this.peliculas = categorias);
  }

}
