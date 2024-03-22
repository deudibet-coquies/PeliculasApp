import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Categoria } from '../../interfaces/Categoria';
import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'app-categorias-pages',
  templateUrl: './categorias-pages.component.html',
  styleUrl: './categorias-pages.component.css'
})
export class CategoriasPagesComponent implements OnInit {

  public categorias: Categoria[] = []; 

  constructor(private service: PeliculasService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.service.getCategorias()
      .subscribe(categorias => this.categorias = categorias);
  }



}
