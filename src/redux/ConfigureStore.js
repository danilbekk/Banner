import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import currentReducer from "./features/position";
export const store = createStore(
  combineReducers({
    current: currentReducer,
  }),
  composeWithDevTools()
);
