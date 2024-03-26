import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,){

      this.loginForm = this.fb.group({   
        nombreUsuario: ['', Validators.required],
        password: ['', Validators.required],    
      });

  }

  ngOnInit(): void {

  }

  onLogin():void{
    if( !this.loginForm.value ) return
    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log('respuesta del login',{res});
      this.router.navigate(['/peliculas'])
    })
  }

}
