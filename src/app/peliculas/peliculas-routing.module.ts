import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPeliculaPageComponent } from './pages/new-pelicula-page/new-pelicula-page.component';
import { ShearchPeliculaPageComponent } from './pages/shearch-pelicula-page/shearch-pelicula-page.component';
import { PeliculaPagesComponent } from './pages/pelicula-pages/pelicula-pages.component';
import { CategoriasPagesComponent } from './pages/categorias-pages/categorias-pages.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutPagesComponent,
    children: [
      { path: 'new-pelicula',    component: NewPeliculaPageComponent }, 
      { path: 'list-peliculas',            component: ListPageComponent },
      { path: 'edit/:id',    component: NewPeliculaPageComponent },     
      { path: 'search',         component: ShearchPeliculaPageComponent },
      { path: 'list-categorias',         component: CategoriasPagesComponent },
      { path: ':id',        component: PeliculaPagesComponent },
      {path:'**',redirectTo:'list-peliculas'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
