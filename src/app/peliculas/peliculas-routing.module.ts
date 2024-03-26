import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagesComponent } from './pages/privadas/layout-pages/layout-pages.component';
import { ListPageComponent } from './pages/privadas/list-page/list-page.component';
import { NewPeliculaPageComponent } from './pages/privadas/new-pelicula-page/new-pelicula-page.component';
import { ShearchPeliculaPageComponent } from './pages/privadas/shearch-pelicula-page/shearch-pelicula-page.component';
import { PeliculaPagesComponent } from './pages/privadas/pelicula-pages/pelicula-pages.component';
import { CategoriasPagesComponent } from './pages/privadas/categorias-pages/categorias-pages.component';
import { PeliculaPublicPageComponent } from './pages/publicas/pelicula-public-page/pelicula-public-page.component';

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
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
