import { Mode } from "../../models/User";

import {
  MODE_CHANGE,
  ModeChangeAction,
} from './types';

export function setJsonMode(): ModeChangeAction {
  return {
    type: MODE_CHANGE,
    payload: {
      mode: Mode.JSON,
    },
  };
}
export function setTableMode(): ModeChangeAction {
  return {
    type: MODE_CHANGE,
    payload: {
      mode: Mode.TABLE,
    },
  };
}
