import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { LayoutPagesComponent } from './pages/privadas/layout-pages/layout-pages.component';
import { ListPageComponent } from './pages/privadas/list-page/list-page.component';
import { NewPeliculaPageComponent } from './pages/privadas/new-pelicula-page/new-pelicula-page.component';
import { PeliculaPagesComponent } from './pages/privadas/pelicula-pages/pelicula-pages.component';
import { ShearchPeliculaPageComponent } from './pages/privadas/shearch-pelicula-page/shearch-pelicula-page.component';
import { MaterialModule } from '../material/material.module';
import { CategoriasPagesComponent } from './pages/privadas/categorias-pages/categorias-pages.component';
import { CardComponent } from './components/card/card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ValueByIdPipe } from './pipes/value-by-id.pipe';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { PeliculaPublicPageComponent } from './pages/publicas/pelicula-public-page/pelicula-public-page.component';



@NgModule({
    declarations: [
        LayoutPagesComponent,
        ListPageComponent,
        NewPeliculaPageComponent,
        PeliculaPagesComponent,
        ShearchPeliculaPageComponent,
        CategoriasPagesComponent,
        CardComponent,
        TruncatePipe,
        ValueByIdPipe,
        HeroImagePipe,
        ConfirmDialogComponent,
        PeliculaPublicPageComponent,
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
