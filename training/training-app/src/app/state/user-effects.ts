import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  exhaustMap,
  withLatestFrom,
  filter,
  tap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '../service/users-service';
import { UserActions, OrganizingUsersActions, loginActions } from './user-action';
import { selectAllUsers } from './users.selectors';
import { User } from './user-model';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  private store = inject(Store);
  private router = inject(Router);
  private userService = inject(UserService);

  constructor(private actions$: Actions) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message || 'Failed to load users' }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizingUsersActions.addUser),
      exhaustMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map((savedUser) => OrganizingUsersActions.addUserSuccess({ user: savedUser })),
          catchError((error) =>
            of(
              OrganizingUsersActions.addUserFailure({
                error: error.message || 'Failed to add user',
              })
            )
          )
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrganizingUsersActions.removeUser),
      exhaustMap(({ userId }) =>
        this.userService.removeUser(userId).pipe(
          map(() => OrganizingUsersActions.removeUserSuccess({ userId })),
          catchError((error) =>
            of(
              OrganizingUsersActions.removeUserFailure({
                error: error.message || 'Failed to remove user',
              })
            )
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginActions.loginWithUser),
      withLatestFrom(this.store.select(selectAllUsers)),
      switchMap(([{ username, password }, users]) => {
        if (!username?.trim() || !password?.trim()) {
          return of(loginActions.loginWithUserFailure({ loginComplete: false }));
        }

        const normalizedUsername = username.trim().toLowerCase();
        const matchingUser = users?.find(
          (user: User) =>
            user.name?.trim().toLowerCase() === normalizedUsername && user.password === password
        );

        if (matchingUser) {
          return of(loginActions.loginWithUserSuccess({ Account: matchingUser }));
        }

        return of(loginActions.loginWithUserFailure({ loginComplete: false }));
      })
    )
  );

  loginSuccessNavigation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginActions.loginWithUserSuccess),
        tap(() => this.router.navigate(['/account-page']))
      ),
    { dispatch: false }
  );
}
