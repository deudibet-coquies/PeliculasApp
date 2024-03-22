import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';
import { forkJoin } from 'rxjs';
import { Categoria, Clasificacion } from '../../interfaces/Categoria';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'peliculas-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
 

  @Input()
  public pelicula!: Pelicula;
  
  public categorias: Categoria[] = [];
  public clasificacion: Clasificacion[] = [];
  constructor(private service: PeliculasService) {}
 

  ngOnInit(): void {
    if(!this.pelicula) throw Error('Requerida la pelicula');  
    this.fetchDataList();  
  }

  fetchDataList(): void {
    forkJoin([
      this.service.getCategorias(),
      this.service.getClasificacion()
    ]).subscribe(
      ([lista1, lista2]) => {
        this.categorias = lista1;
        this.clasificacion = lista2;
        console.log('this.clasificacion ',this.clasificacion );
      },
      error => {
        console.error('Error al cargar datos:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario, etc.
      }
    );
    }



}
