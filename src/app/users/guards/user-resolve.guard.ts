import { Injectable } from '@angular/core';
import { Router,  } from '@angular/router';
import type { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { type Observable, of, EMPTY, catchError, take, switchMap } from 'rxjs';

import { UserModel } from './../models/user.model';
import { UserArrayService } from './../services/user-array.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private userArrayService: UserArrayService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new UserModel(null, '', ''));
    }

    const id = route.paramMap.get('userID')!;

    return this.userArrayService.getUser(id).pipe(
      switchMap((user: UserModel) => {
        if (user) {
          return of(user);
        } else {
          this.router.navigate(['/users']);
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return EMPTY;
      })
    );
  }
}
