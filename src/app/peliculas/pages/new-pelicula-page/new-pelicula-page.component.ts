import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Categoria, Clasificacion } from '../../interfaces/Categoria';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-pelicula-page',
  templateUrl: './new-pelicula-page.component.html',
  styleUrl: './new-pelicula-page.component.css'
})
export class NewPeliculaPageComponent implements OnInit {

  public categorias: Categoria[] = [];
  public clasificacion: Clasificacion[] = [];
  constructor(private service: PeliculasService) {}
 
 



  ngOnInit(): void {
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



  

  crearPelicula(): void {
    const pelicula = {
      "id": 0,
      "nombre": "Avarar 2",
      "rutaImagen": "urll",
      "descripcion": "Un marine es enviado a un planeta alienígena en una misión única.",
      "duracion": 200,
      "clasificacion": 2,
      "fechaCreacion": "2024-03-22T18:55:22.140Z",
      "categoriaId": 3
    };
    this.service.crearPelicula(pelicula).subscribe(response => {
      console.log('Película creada:', response);
      // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito al usuario, etc.
    }, error => {
      console.error('Error al crear película:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario, etc.
    });
  }





}
