import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../../interfaces/pelicula';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../../services/peliculas.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-pelicula-pages',
  templateUrl: './pelicula-pages.component.html',
  styleUrl: './pelicula-pages.component.css'
})
export class PeliculaPagesComponent implements OnInit {

  public isLoading: boolean = false;
  public pelicula?: Pelicula;

  constructor( 
    private activatedRouter: ActivatedRoute,
    private service: PeliculasService,
    private router: Router) {
  }

  
  ngOnInit(): void {    
    this.isLoading = true;
    this.activatedRouter.params
    .pipe( 
      switchMap( ({ id })  => this.service.getpeliculasById(id) )
    )
    .subscribe( resp => {
        if (!resp) {
          this.router.navigateByUrl('')
        }
        this.pelicula = resp;
        this.isLoading = false;
    });
    
  }

}
