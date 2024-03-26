import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/service/auth.service';
import { Router } from '@angular/router';
import { UsuarioClass, UsuarioResponse } from '../../../../auth/interface/Usuario';

@Component({
  selector: 'app-layout-pages',
  templateUrl: './layout-pages.component.html',
  styleUrl: './layout-pages.component.css'
})
export class LayoutPagesComponent {

  

  constructor(
    private  authService: AuthService,
    private router: Router,) {}

  get user(): UsuarioResponse | undefined{    
    return this.authService.currentUser
  }

 public sidebarItem = [
    { label: 'Listado Peliculas', icon: 'label', url: './list-peliculas' },
    { label: 'Añadir Pelicula', icon: 'add', url: './new-pelicula' },
    { label: 'search Pelicula', icon: 'search', url: './search' },
    { label: 'Listado Categorias', icon: 'label', url: './list-categorias' },
  ];

  onlogout():void{
    this.authService.onlogout();
    this.router.navigate(['/auth/login'])
  }


}
