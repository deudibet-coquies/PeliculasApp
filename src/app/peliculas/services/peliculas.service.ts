import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore, Categoria } from '../interfaces/Categoria';
import { CachePeliculaStore, Pelicula } from '../interfaces/pelicula';
import { environment } from '../../../environments/environments';

// const URL_API_PRO = 'http://localhost:9096'
// const URL_API_PEL = 'http://localhost:9095'
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  public ListCategorias: Categoria[] = [];
  public ListPeliculas: Pelicula[] = [];
  private urlApi = environment.URL_API_PEL

  public cacheStore: CacheStore = {
   categoria: this.ListCategorias
  };
  public cachePeliculasStore: CachePeliculaStore = {
    pelicula: this.ListPeliculas
  }

  constructor(private http: HttpClient) {
    // console.log('categoriaStore',this.cacheStore);
    // this.loadFromLocalStorage();
  }


  private saveToLocalStorage(storage:string, list?: CachePeliculaStore | CacheStore ) {
    localStorage.setItem( storage, JSON.stringify( list ));
  }

  private loadFromLocalStorage() {
    if ( !localStorage.getItem('categoriaStore') ) return;
    this.cacheStore = JSON.parse( localStorage.getItem('categoriaStore')! );

    if ( !localStorage.getItem('peliculaStore') ) return;
    this.cacheStore = JSON.parse( localStorage.getItem('peliculaStore')! );

  }

  getpeliculas(): Observable<Pelicula[]> {
    const storage: string = 'peliculaStore';
    return this.http.get<Pelicula[]>(`${this.urlApi}/api/peliculas`).pipe(
      tap( pelicula => this.cachePeliculasStore.pelicula = pelicula),
      tap( () => this.saveToLocalStorage(storage) ),
      catchError(error => of([])),
    );
  }

  getpeliculasSearch(name:string): Observable<Pelicula[]> {
    const storage: string = 'peliculaStore';
    return this.http.get<Pelicula[]>(`${this.urlApi}/api/Peliculas/Buscar?nombre=${name}`).pipe(
      tap( pelicula => this.cachePeliculasStore.pelicula = pelicula),
      tap( () => this.saveToLocalStorage(storage) ),
      catchError(error => of([])),
    );
  }
  
  getpeliculasById(peliculaId:number): Observable<Pelicula | undefined> {
    const storage: string = 'peliculaStore';
    return this.http.get<Pelicula>(`${this.urlApi}/api/peliculas/${peliculaId}`).pipe(
      map(c => c.categoriaId != undefined ? c : undefined ),
      catchError(error => of(undefined)),
    );
  }


  getCategorias(): Observable<Categoria[]> {
    const storage: string = 'categoriaStore';
    return this.http.get<Categoria[]>(`${this.urlApi}/api/categorias`).pipe(
      tap( categoria => this.cacheStore.categoria = categoria),
      tap( () => this.saveToLocalStorage(storage) ),
      catchError(error => of([])),
    );
  }



 


  
}
