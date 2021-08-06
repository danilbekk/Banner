import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import currentReducer from "./position";
export const store = createStore(
  combineReducers({
    current: currentReducer,
  }),
  composeWithDevTools()
);
