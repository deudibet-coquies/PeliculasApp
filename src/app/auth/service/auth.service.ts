import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, UserRegistro, UsuarioResponse } from '../interface/Usuario';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private urlApi = environment.URL_API_PEL;
  private user?: login;
  private userLogin?: UsuarioResponse;
  private UserRegistro?: UserRegistro;

  get currentUser(): UsuarioResponse | undefined {
    if (!this.userLogin?.result.usuario) return undefined
    return structuredClone(this.userLogin);
  }


  constructor(
    private http: HttpClient,
    private router: Router,) { }

  login(Usuario: login): Observable<UsuarioResponse> {
    const headers = new HttpHeaders()
    // .set('Authorization', token ) // Reemplaza 'tu_token' con tu token de autenticación
    // .set('Content-Type', 'application/json');  
    return this.http.post<UsuarioResponse>(`${this.urlApi}/api/Usuarios/login`, Usuario, { headers })
      .pipe(
        tap(login => this.userLogin = login),
        tap(login => localStorage.setItem('token', login.result.token),
          catchError(error => of(error)),
        ),
        tap(login => localStorage.setItem('usuario', JSON.stringify( login.result.usuario)),
        catchError(error => of(error)),
      ))

  }

  onlogout() {
    localStorage.clear();
    this.router.navigate(['/auth'])
  }

  checkAutentication(): Observable<boolean>{
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('usuario') || '');
    const headers = new HttpHeaders()
      .set('Authorization',  `Bearer ${token}`) // Reemplaza 'tu_token' con tu token de autenticación
      .set('Content-Type', 'application/json');
    return this.http.get<UserRegistro>(`${this.urlApi}/api/Usuarios/${user.id}`, { headers })
      .pipe(  
        tap( user => this.UserRegistro = user ),
        map( user => !!this.UserRegistro ),
        catchError( err => of(false) )
      );
  }


}
