import {
  SET_USERS,
  SET_SELECTED_GENDER,
  SetSelectedGenderAction,
} from "./actionTypes";
import { User } from "./types";

interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

export const setSelectedGender = (
  gender: string | null
): SetSelectedGenderAction => ({
  type: SET_SELECTED_GENDER,
  payload: gender,
});

export const setUsers = (users: User[]): SetUsersAction => ({
  type: SET_USERS,
  payload: users,
});
