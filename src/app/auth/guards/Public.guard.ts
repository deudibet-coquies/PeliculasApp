import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, CanMatchFn, GuardResult, MaybeAsync, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap, pipe, map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class publicGuard implements CanMatch, CanActivate {

  constructor( 
    private authService: AuthService,
    private router:Router
    ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAutentication()
      .pipe(
        tap(isAuthenticated => console.log('Authenticated 2:', isAuthenticated)),
        tap(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigate(['./peliculas/list-peliculas'])
          }
        }),
        map(isAuthenticated => !isAuthenticated)
      )
  }


  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('Can Match');
    // console.log({ route, segments })
    return  this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log('Can Activate');
    // console.log({ route, state })

    return this.checkAuthStatus();
  }

  
  
}
