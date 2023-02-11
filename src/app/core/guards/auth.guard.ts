import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import type { CanActivate, CanLoad, NavigationExtras, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { type Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    console.log('CanActivateGuard is called');

    // Create a dummy session id
    const sessionId = 123456789;

    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId },
      fragment: 'anchor'
    };

    const { url } = state;

    if (this.authService.checkLogin(url)) {
      return true;
    } else {
      this.router.navigate(['/login'], navigationExtras);
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('CanLoad Guard is activated');
    const url = `/${route.path}`;

    return this.authService.checkLogin(url);
  }
}


