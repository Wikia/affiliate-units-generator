import AffiliateUnit from '../../models/AffiliateUnit';

import {
  UNIT_ADD,
  UNIT_UPDATE,
  UNIT_REMOVE,
  LOAD_UNITS,
  UnitAddAction,
  UnitUpdateAction,
  UnitRemoveAction,
  LoadUnitsAction,
} from './types';

export function unitAdd(unit: AffiliateUnit): UnitAddAction {
  return {
    type: UNIT_ADD,
    payload: {
      unit,
    },
  };
}

export function unitUpdate(index: number, unit: AffiliateUnit): UnitUpdateAction {
  return {
    type: UNIT_UPDATE,
    payload: {
      index,
      unit,
    },
  };
}

export function unitRemove(index: number): UnitRemoveAction {
  return {
    type: UNIT_REMOVE,
    payload: {
      index,
    },
  };
}

export function loadUnits(json: string): LoadUnitsAction {
  return {
    type: LOAD_UNITS,
    payload: {
      json,
    },
  };
}
