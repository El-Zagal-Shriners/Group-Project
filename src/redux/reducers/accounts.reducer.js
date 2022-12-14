import { combineReducers } from "redux";

// Reducer to store accounts
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

// Reducer to store account dependents
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
