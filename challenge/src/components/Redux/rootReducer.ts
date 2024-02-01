// // rootReducer.ts
// import { SET_USERS, SET_SELECTED_GENDER } from './actionTypes';
// import { User } from './types';

// interface SetUsersAction {
//   type: typeof SET_USERS;
//   payload: User[];
// }

// interface SetSelectedGenderAction {
//   type: typeof SET_SELECTED_GENDER;
//   payload: string | null;
// }

// export const usersReducer = (state: User[] = [], action: SetUsersAction): User[] => {
//   switch (action.type) {
//     case SET_USERS:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export const selectedGenderReducer = (state: string | null = null, action: SetSelectedGenderAction): string | null => {
//   switch (action.type) {
//     case SET_SELECTED_GENDER:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export { usersReducer, selectedGenderReducer };


// rootReducer.ts
import { combineReducers } from 'redux';
import { SET_USERS, SET_SELECTED_GENDER } from './actionTypes';
import { User } from './types';

interface SetUsersAction {
  type: typeof SET_USERS;
  payload: User[];
}

interface SetSelectedGenderAction {
  type: typeof SET_SELECTED_GENDER;
  payload: string | null;
}

const usersReducer = (state: User[] = [], action: SetUsersAction): User[] => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};

const selectedGenderReducer = (state: string | null = null, action: SetSelectedGenderAction): string | null => {
  switch (action.type) {
    case SET_SELECTED_GENDER:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users: usersReducer,
  selectedGender: selectedGenderReducer,
});

export default rootReducer;
