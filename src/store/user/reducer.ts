import { Action } from 'redux';

import {
  UserStore,
  initialState,
  UserActions,
  MODE_CHANGE,
  ModeChangeAction,
} from './types';


function userReducer(state: UserStore = initialState, action: UserActions | Action): UserStore {
  const newState = Object.assign(Object.create(state), state);

  switch (action.type) {
    case MODE_CHANGE: {
      const { payload: { mode } } = action as ModeChangeAction;
      newState.mode = mode;
      return newState;
    }
    default:
      return newState;
  }
}

export default userReducer;
