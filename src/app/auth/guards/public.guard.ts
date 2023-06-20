import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuth()
      .pipe(
        tap( isAuteticated => console.log({isAuteticated}) ),
        tap( isAuteticated => {
          if ( isAuteticated ) {
            this.router.navigate(['/heroes/list']);
          }
        }),
        map( isAuteticated => !isAuteticated )
      );
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('canMatch', segments);
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // console.log('canActivate', {route}, {state});
    return this.checkAuthStatus();
  }

}
