import User, { Mode } from "../../models/User";

export type UserStore = User;
export const initialState: UserStore = User.empty();

export const MODE_CHANGE = 'MODE_CHANGE';

// Keep in sync
export type UserActions =
  ModeChangeAction;

// Actions:
export type ModeChangeAction = {
  type: typeof MODE_CHANGE;
  payload: {
    mode: Mode,
  },
};
