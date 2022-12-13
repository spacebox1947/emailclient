import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, skipWhile, take, tap, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // can you load a lazyLoad module?
  // this is not perfect yet
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // a Guard's observable MUST be COMPLETE before it will navigate
      return this.authService.signedIn$.pipe(
        skipWhile((value) => value === null),
        take(1),
        tap((authenticated) => {
          if (!authenticated) {
            this.router.navigateByUrl('/');
          }
        }),
        map((authenticated) => !!authenticated || this.router.parseUrl('/'))
      );
    }
}