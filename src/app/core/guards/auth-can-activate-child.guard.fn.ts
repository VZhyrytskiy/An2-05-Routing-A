import { inject } from "@angular/core";
import { Router } from "@angular/router";
import type { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import type { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

export function authCanActivateChildGuardFn(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree{

  console.log('CanActivateChild Guard is called');
  const { url } = state;

  return inject(AuthService).checkLogin(url)
    ? true
    : inject(Router).parseUrl('/login');
}
