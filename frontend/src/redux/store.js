import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { paginationReducer } from "./reducer/paginationReducer";
import { queryReducer } from "./reducer/queryReducer";
import { usersReducer } from "./reducer/usersReducer";
import { teamReducer } from "./reducer/teamReducer";

const reducer = combineReducers({
  page: paginationReducer,
  query: queryReducer,
  usersData: usersReducer,
  team: teamReducer,
});

const middleWare = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
