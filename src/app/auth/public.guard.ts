// import { inject } from '@angular/core';
// import { CanActivateFn, CanMatchFn, Router, CanMatch, CanActivate } from '@angular/router';
// import { Observable, tap, map } from 'rxjs';
// import { AuthService } from './services/user.service.service';

// export const canActivate: CanActivateFn = (route, state) => {
//   return checkLogout();


// };
// export const canMatch: CanMatchFn = (route, segments) => {
//    return checkLogout();
// };

// const checkLogout = () : boolean | Observable<boolean> =>{
//   const router: Router = inject(Router);
//   const authService: AuthService = inject(AuthService);

//   return authService.checkAutentication()
//   .pipe(
//     tap(isLogin => console.log('Login: ' , isLogin)),
//     map(islogin => !islogin),
//     tap(isLogin => {
//       if (isLogin) {
//         router.navigateByUrl('/heroes/list')
//       }
//     })
//   )
// }
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router, } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './services/user.service.service';

@Injectable({providedIn: 'root'})
export class IsLoginGuard implements CanMatch, CanActivate {
  constructor(
    private router : Router,
    private serviceAuth : AuthService
  ) { }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkLogout();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean >  {
    return this.checkLogout();
  }

  private checkLogout():boolean | Observable<boolean>{
    return this.serviceAuth.checkAutentication()
      .pipe(
        tap(isLogin => console.log('Login: ' , isLogin)),
        map(islogin => !islogin),
        tap(isLogin => {
          if (  !isLogin) {
            this.router.navigateByUrl('/heroes')
          }
        })
      )

  }

}
