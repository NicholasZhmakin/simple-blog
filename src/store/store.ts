import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers/reducer";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "../types/actions";

const initState = {};

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);

export type AppState = ReturnType<typeof reducer>;

export default store;
