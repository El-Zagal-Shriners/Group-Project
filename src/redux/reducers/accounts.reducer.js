import { combineReducers } from "redux";

const accountsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_ACCOUNTS":
      return action.payload;
    case "UNSET_ACCOUNTS":
      return [];
    default:
      return state;
  }
};

const accountDependents = (state = [], action) => {
  switch (action.type) {
    case "SET_DEPENDENTS":
      return action.payload;
    case "UNSET_ACCOUNTS":
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  accountsReducer,
  accountDependents,
});
