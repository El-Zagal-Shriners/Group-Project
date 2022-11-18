import { combineReducers } from "redux";

// reducer to store all cities.
const allCitiesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_CITIES":
      return action.payload;
    case "UNSET_CITIES":
      return [];
    default:
      return state;
  }
};

// reducer to store closest cities to user.
const closeCitiesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CLOSE_CITIES":
      return action.payload;
    case "UNSET_CITIES":
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  allCitiesReducer,
  closeCitiesReducer,
});
