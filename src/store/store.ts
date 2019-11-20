import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import unitsReducer from "./units/reducer";
import userReducer from "./user/reducer";

const combinedReducer = combineReducers({
  units: unitsReducer,
  user: userReducer,
});

// not used for now
const middleware: any = [];

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combinedReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export type AppState = ReturnType<typeof combinedReducer>;
export default store;
