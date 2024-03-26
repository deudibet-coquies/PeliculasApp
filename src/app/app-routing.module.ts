import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, CanMatch } from '@angular/router';
import { Error404PagesComponent } from './shared/pages/error404-pages/error404-pages.component';
import { authGuard } from './auth/guards/Auth.guard';
import { publicGuard } from './auth/guards/Public.guard';
import { PeliculaPublicPageComponent } from './peliculas/pages/publicas/pelicula-public-page/pelicula-public-page.component';

const routes: Routes = [
  {
    path:'auth', 
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate: [publicGuard],
    canMatch: [publicGuard]
  },
  {
    path:'peliculas', 
    loadChildren: () => import('./peliculas/peliculas.module').then(m=>m.PeliculasModule),
    canActivate: [authGuard],
    canMatch: [authGuard]
  },
  {
    path:'listado-peliculas', component:PeliculaPublicPageComponent,
    // canActivate: [authGuard],
    // canMatch: [authGuard]
  },
  {
    path:'404', component:Error404PagesComponent
  },
  {
    path:'', redirectTo:'peliculas',pathMatch:'full'
  },
  {
    path:'**', redirectTo:'404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
