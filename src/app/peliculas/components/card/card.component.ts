import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula';

@Component({
  selector: 'peliculas-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
 

  @Input()
  public pelicula!: Pelicula; 

  ngOnInit(): void {
    if(!this.pelicula) throw Error('Requerida la pelicula');    
  }

}
