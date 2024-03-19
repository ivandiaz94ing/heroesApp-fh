import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/user.service.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private router : Router,
    private authService : AuthService
  ) { }

  private checkAuthentication(): boolean | Observable<boolean>{
    return this.authService.checkAutentication()
    .pipe(
      tap(isAutenticated => console.log('Autenticated: ', isAutenticated ) ),
      tap(isAutenticated =>{
        if (!isAutenticated) {
          this.router.navigateByUrl('auth/login')
        }
      }),

    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean > {
    //console.log('Can Activate ');
    //console.log({route, state});
     return this.checkAuthentication();


  }
  canMatch(route: Route, segments: UrlSegment[]):boolean |  Observable<boolean > {
    //console.log('Can Match');
    //console.log({route, segments});
   return this.checkAuthentication();

  }

}

// import { Injectable, inject } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivateFn,
//   CanMatchFn,
//   Route,
//   Router,
//   RouterStateSnapshot,
//   UrlSegment,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/user.service.service';

// const router = inject(Router);
// const authService = inject(AuthService);



// export function canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
//   console.log('Can Activate');
//   console.log({ route, state });
//   return true; // Lógica de autorización
// }

// export function canMatch(route: Route, segments: UrlSegment[]): boolean {
//   console.log('Can Match');
//   console.log({ route, segments });
//   return true; // Lógica de coincidencia de rutas
// }
