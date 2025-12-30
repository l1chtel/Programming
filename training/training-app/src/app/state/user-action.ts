import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Account, User } from './user-model';

// API Actions (Effects → Reducer)

export const UserActions = createActionGroup({
  source: 'User API',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: props<{ error: string }>(),
  },
});

export const OrganizingUsersActions = createActionGroup({
  source: 'Organizing Users',
  events: {
    addUser: props<{ user: User }>(),
    addUserSuccess: props<{ user: User }>(),
    addUserFailure: props<{ error: string }>(),
    removeUser: props<{ userId: string }>(),
    removeUserSuccess: props<{ userId: string }>(),
    removeUserFailure: props<{ error: string }>(),
  },
});

// UI Actions (Component → Reducer)
export const loginActions = createActionGroup({
  source: 'Login',
  events: {
    loginWithUser: props<{ username: string; password: string }>(),
    loginWithUserSuccess: props<{ Account: Account }>(),
    loginWithUserFailure: props<{ loginComplete: boolean }>(),
  },
});

export const clearSelectedUser = createAction('[User UI] Clear Selected User');

export interface UserErrorPayload {
  error: string;
}

export const userError = createAction('[User API] Error', props<UserErrorPayload>());
