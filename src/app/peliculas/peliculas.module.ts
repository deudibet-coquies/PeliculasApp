import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPeliculaPageComponent } from './pages/new-pelicula-page/new-pelicula-page.component';
import { PeliculaPagesComponent } from './pages/pelicula-pages/pelicula-pages.component';
import { ShearchPeliculaPageComponent } from './pages/shearch-pelicula-page/shearch-pelicula-page.component';
import { MaterialModule } from '../material/material.module';
import { CategoriasPagesComponent } from './pages/categorias-pages/categorias-pages.component';
import { CardComponent } from './components/card/card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        LayoutPagesComponent,
        ListPageComponent,
        NewPeliculaPageComponent,
        PeliculaPagesComponent,
        ShearchPeliculaPageComponent,
        CategoriasPagesComponent,
        CardComponent,
        TruncatePipe
    ],
    imports: [
        CommonModule,
        PeliculasRoutingModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        
    ]
})
export class PeliculasModule { }
