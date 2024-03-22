import { Component } from '@angular/core';

@Component({
  selector: 'app-new-pelicula-page',
  templateUrl: './new-pelicula-page.component.html',
  styleUrl: './new-pelicula-page.component.css'
})
export class NewPeliculaPageComponent {

 public categories = [
    { id: 1, name: 'Acción' },
    { id: 2, name: 'Comedia' },
    { id: 3, name: 'Drama' },
    // Agrega más categorías según sea necesario
  ];

 public ratings = [
    { value: 1, viewValue: 'Clasificación 1' },
    { value: 2, viewValue: 'Clasificación 2' },
    { value: 3, viewValue: 'Clasificación 3' },
    // Agrega más clasificaciones según sea necesario
  ];

}
