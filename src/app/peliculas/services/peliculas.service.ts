import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore, Categoria, Clasificacion } from '../interfaces/Categoria';
import { CachePeliculaStore, Pelicula } from '../interfaces/pelicula';
import { environment } from '../../../environments/environments';

// const URL_API_PRO = 'http://localhost:9096'
// const URL_API_PEL = 'http://localhost:9095'

const token ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkVtaWxpb0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE3MTEyMjUwNDIsImV4cCI6MTcxMTMxMTQ0MiwiaWF0IjoxNzExMjI1MDQyfQ.GYp08ypET1hkrPKxrtnVkyApvewSKPanmH_bPXj53Lw'
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  public ListCategorias: Categoria[] = [];
  public ListPeliculas: Pelicula[] = [];
  public ListClasificaciones: Clasificacion[] = [];
  private urlApi = environment.URL_API_PEL
  private urlApiLocal = environment.API_ASSETS
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


  crearPelicula(pelicula: Pelicula): Observable<Pelicula> {
    const headers = new HttpHeaders()
      .set('Authorization', token ) // Reemplaza 'tu_token' con tu token de autenticación
      .set('Content-Type', 'application/json');  
    return this.http.post<Pelicula>(`${this.urlApi}/api/peliculas`, pelicula, { headers });
  }

  actualizarPelicula(pelicula: Pelicula): Observable<Pelicula> {
    const headers = new HttpHeaders()
      .set('Authorization', token ) // Reemplaza 'tu_token' con tu token de autenticación
      .set('Content-Type', 'application/json');  
    return this.http.patch<Pelicula>(`${this.urlApi}/api/peliculas/${pelicula.id}`, pelicula, { headers });
  }  

  eliminarPelicula(peliculaId:number): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Authorization', token ) // Reemplaza 'tu_token' con tu token de autenticación
      .set('Content-Type', 'application/json'); 
      console.log('este el id a eliminar',peliculaId);
    return this.http.delete(`${this.urlApi}/api/peliculas/${peliculaId}`,{ headers }).pipe(
      map(resp => true),
      catchError(error => of(false)),      
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
 
  getClasificacion(): Observable<Clasificacion[]> {
    return this.http.get<Clasificacion[]>(`${this.urlApiLocal}`).pipe(
      map(res => this.ListClasificaciones = res),
      catchError(error => of([])),
    );
  }

  
}
