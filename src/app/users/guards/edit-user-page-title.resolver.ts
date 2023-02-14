import { Injectable } from '@angular/core';
import { type Resolve, type ActivatedRouteSnapshot  } from '@angular/router';
import { type Observable, of, catchError, take, switchMap } from 'rxjs';

import { UserModel } from './../models/user.model';
import { UserArrayService } from './../services/user-array.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserPageTitleResolver implements Resolve<string> {
  constructor(
    private userArrayService: UserArrayService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const defaultPageTitle = 'Edit User';

    if (!route.paramMap.has('userID')) {
      return of(defaultPageTitle);
    }

    const id = route.paramMap.get('userID')!;

    return this.userArrayService.getUser(id).pipe(
      switchMap((user: UserModel) => {
        if (user) {
          return of(`${defaultPageTitle}: ${user.firstName} ${user.lastName}`);
        } else {
          return of(defaultPageTitle);
        }
      }),
      take(1),
      catchError(() => {
        return of(defaultPageTitle);
      })
    );
  }
}
