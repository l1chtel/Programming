import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrganizingUsersActions, UserActions, loginActions } from '../state/user-action';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  hidePassword = signal(true);
  formValid$ = this.loginForm.statusChanges.pipe(
    map(() => this.loginForm.valid),
    startWith(this.loginForm.valid)
  );

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }

  login() {
    const { username, password } = this.loginForm.value || {};
    if (username && password) {
      this.store.dispatch(loginActions.loginWithUser({ username, password }));
      this.loginForm.reset();
    }
  }

  addUser() {
    const { username, password } = this.loginForm.value || {};
    if (username && password) {
      this.store.dispatch(
        OrganizingUsersActions.addUser({
          user: { name: username, password, creationDate: new Date() },
        })
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword.update((hide) => !hide);
  }
}
