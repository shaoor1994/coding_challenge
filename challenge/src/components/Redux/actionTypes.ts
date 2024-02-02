export const SET_USERS = "SET_USERS";
export const SET_SELECTED_GENDER = "SET_SELECTED_GENDER";

export interface SetSelectedGenderAction {
  type: typeof SET_SELECTED_GENDER;
  payload: string | null;
}
