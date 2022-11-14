import { combineReducers } from "redux";

// reducer to store all cities.
const citiesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_CITIES":
      return action.payload;
    default:
      return state;
  }
};

// reducer to store closest cities to user.
const closeCitiesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CLOSE_CITIES":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  citiesReducer,
  closeCitiesReducer,
});
