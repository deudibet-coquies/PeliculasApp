import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Categoria, Clasificacion } from '../../interfaces/Categoria';
import { forkJoin, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pelicula } from '../../interfaces/pelicula';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-pelicula-page',
  templateUrl: './new-pelicula-page.component.html',
  styleUrl: './new-pelicula-page.component.css'
})
export class NewPeliculaPageComponent implements OnInit {

  public peliculaForm: FormGroup;

  public categorias: Categoria[] = [];
  public clasificacion: Clasificacion[] = [];
  public pelicula: Pelicula | undefined;
  public isLoading: boolean = false;

  constructor(
    private service: PeliculasService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _sn: MatSnackBar,
    public dialog: MatDialog
  ) {

    this.peliculaForm = this.fb.group({

      id: [''],
      nombre: ['', Validators.required],
      rutaImagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      fechaCreacion: [''],
      categoriaId: ['', Validators.required],


    });

  }

  ngOnInit(): void {
    this.fetchDataList();
    if (!this.router.url.includes('edit')) return

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getpeliculasById(id))
      )
      .subscribe(resp => {
        if (!resp) {
          this.router.navigateByUrl('')
        }
        this.pelicula = resp;
        this.setData(this.pelicula);
      });


  }

  fetchDataList(): void {
    forkJoin([
      this.service.getCategorias(),
      this.service.getClasificacion()
    ]).subscribe(
      ([lista1, lista2]) => {
        this.categorias = lista1;
        this.clasificacion = lista2;
      },
      error => {
        console.error('Error al cargar datos:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario, etc.
      }
    );
  }

  setData(data: Pelicula | undefined){
    this.peliculaForm.reset(data);
    // this.peliculaForm.setValue({
    //   id: data?.id,
    //   nombre: data?.nombre,
    //   rutaImagen: data?.rutaImagen,
    //   descripcion: data?.descripcion,
    //   duracion: data?.duracion,
    //   clasificacion: data?.clasificacion,
    //   fechaCreacion: data?.fechaCreacion,
    //   categoriaId: data?.categoriaId,
    // })
  }

  get corrrenPelicula(): Pelicula {
    const peli = this.peliculaForm.value as Pelicula
    return peli
  }

  crearPelicula(): void {
    if (this.peliculaForm.invalid) return
    if (this.corrrenPelicula.id) {
      this.service.actualizarPelicula(this.corrrenPelicula).subscribe(response => {
        this.router.navigate(['/peliculas/edit',response.id])
        this.showSnackBar(`Se a actualizado de forma exitosa la pelicula, ${this.peliculaForm.value.nombre}` )
      }, error => {
        console.error('Error al crear película:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario, etc.
      });
      return
    }

    this.corrrenPelicula.id = 0
    this.corrrenPelicula.fechaCreacion = '2024-03-22T22:13:16.084Z'
    this.service.crearPelicula(this.corrrenPelicula).subscribe(response => {
      this.showSnackBar(`Se a creado de forma exitosa la pelicula, ${response.nombre}` ),
      this.router.navigate(['/peliculas/list-peliculas'])
    }, error => {
      console.error('Error al crear película:', error);
    });


  }

  onDeeletePelicula(){

    // dialogRef.afterClosed()
    // .pipe(
    //   filter( (result: boolean) => result ),  //condicional 
    //   switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )), // ava se manda el servicio
    //   filter( (wasDeleted: boolean) => wasDeleted ), // lo deja avanzar solo si lo elimina
    // )
    // .subscribe(() => {
    //   this.router.navigate(['/heroes']);  // se redirige
    // });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.peliculaForm.value,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.service.eliminarPelicula(this.corrrenPelicula.id).subscribe(res => {
          if(res)
          this.router.navigate(['/peliculas/list-peliculas'])
        })
    });
  }

  showSnackBar(m:string):void{
   this._sn.open(m, 'ok', {
    duration:3000,    
   })
  }




}
