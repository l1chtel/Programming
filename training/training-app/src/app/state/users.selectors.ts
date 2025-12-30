import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from './user-model';

export interface UsersState {
  users: User[];
  loading: boolean;
  selectedId: string | null;
}

const getUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(getUsersState, (state) => state.users);

export const getSelectedUserId = createSelector(getUsersState, (state) => state.selectedId);

export const getSelectedUser = createSelector(selectAllUsers, getSelectedUserId, (users, userId) =>
  userId ? users.find((u) => u.id === userId) || null : null
);
