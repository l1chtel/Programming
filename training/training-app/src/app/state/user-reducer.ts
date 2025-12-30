import { createReducer, on } from '@ngrx/store';
import { User } from './user-model';
import {
  UserActions,
  clearSelectedUser,
  OrganizingUsersActions,
  loginActions,
} from './user-action';

const { addUserSuccess, removeUserSuccess } = OrganizingUsersActions;
const { loginWithUser } = loginActions;

export interface UsersState {
  users: User[];
  loading: boolean;
  selectedId: string | null;
  isLoggedIn: boolean;
  currentUser: User | null;
  loginError: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  selectedId: null,
  isLoggedIn: false,
  currentUser: null,
  loginError: null,
};

export const usersReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    users: [],
  })),

  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(removeUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== userId),
  })),

  on(loginWithUser, (state, { username, password }) => {
    const matchingUser = state.users.find(
      (user) => user.name === username && user.password === password
    );
    return matchingUser
      ? {
          ...state,
          isLoggedIn: true,
          currentUser: matchingUser,
          loginError: null,
        }
      : {
          ...state,
          isLoggedIn: false,
          currentUser: null,
          loginError: 'Invalid credentials.',
        };
  }),

  on(clearSelectedUser, (state) => ({
    ...state,
    selectedId: null,
  }))
);
