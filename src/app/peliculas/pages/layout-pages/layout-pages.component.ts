import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-pages',
  templateUrl: './layout-pages.component.html',
  styleUrl: './layout-pages.component.css'
})
export class LayoutPagesComponent {

 public sidebarItem = [
    { label: 'Listado Peliculas', icon: 'label', url: './list-peliculas' },
    { label: 'Añadir Pelicula', icon: 'add', url: './new-pelicula' },
    { label: 'search Pelicula', icon: 'search', url: './search' },
    { label: 'Listado Categorias', icon: 'label', url: './list-categorias' },
  ];


}
