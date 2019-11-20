import { Action } from 'redux';

import {
  UnitsStore,
  initialState,
  loadStoreFromJson,
  UnitsActions,
  UNIT_ADD,
  UNIT_UPDATE,
  UNIT_REMOVE,
  LOAD_UNITS,
  UnitAddAction,
  UnitRemoveAction,
  UnitUpdateAction,
  LoadUnitsAction,
} from './types';


function unitsReducer(state: UnitsStore = initialState, action: UnitsActions | Action): UnitsStore {
  const newState = state.slice();

  switch (action.type) {
    case UNIT_ADD: {
      const { payload: { unit } } = action as UnitAddAction;
      newState.push(unit);
      return newState;
    }
    case UNIT_UPDATE: {
      const { payload: { index, unit } } = action as UnitUpdateAction;
      newState[index] = unit;
      return newState;
    }
    case UNIT_REMOVE: {
      const { payload: { index } } = action as UnitRemoveAction;
      newState.splice(index, 1);
      return newState;
    }
    case LOAD_UNITS: {
      const { payload: { json } } = action as LoadUnitsAction;
      return loadStoreFromJson(json);
    }
    default:
      return newState;
  }
}

export default unitsReducer;
