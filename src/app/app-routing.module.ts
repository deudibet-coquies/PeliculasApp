import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PagesComponent } from './shared/pages/error404-pages/error404-pages.component';

const routes: Routes = [
  {
    path:'auth', 
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'peliculas', 
    loadChildren: () => import('./peliculas/peliculas.module').then(m=>m.PeliculasModule)
  },
  {
    path:'404', component:Error404PagesComponent
  },
  {
    path:'', redirectTo:'peliculas',pathMatch:'full'
  },
  {
    path:'**', redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
