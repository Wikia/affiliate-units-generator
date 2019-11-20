import AffiliateUnit from "../../models/AffiliateUnit";
export type UnitsStore = AffiliateUnit[];
export const initialState: UnitsStore = [];

export function loadStoreFromJson(json: string): UnitsStore {
  const data = JSON.parse(json);

  if (!Array.isArray(data)) {
    return initialState;
  }

  const potentialData = data.map(u => AffiliateUnit.load(u));
  return potentialData.filter(Boolean) as AffiliateUnit[];
}

export const UNIT_UPDATE = 'UNIT_UPDATE';
export const UNIT_ADD = 'UNIT_ADD';
export const UNIT_REMOVE = 'UNIT_REMOVE';
export const LOAD_UNITS = 'LOAD_UNITS'

// Keep in sync
export type UnitsActions =
  UnitUpdateAction |
  UnitAddAction |
  UnitRemoveAction |
  LoadUnitsAction;

// Actions:
export type UnitUpdateAction = {
  type: typeof UNIT_UPDATE;
  payload: {
    index: number;
    unit: AffiliateUnit;
  }
}
export type UnitAddAction = {
  type: typeof UNIT_ADD;
  payload: {
    unit: AffiliateUnit;
  }
}
export type UnitRemoveAction = {
  type: typeof UNIT_REMOVE;
  payload: {
    index: number;
  }
}
export type LoadUnitsAction = {
  type: typeof LOAD_UNITS;
  payload: {
    json: string;
  }
}

