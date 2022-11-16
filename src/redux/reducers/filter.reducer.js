import { combineReducers } from "redux";

//this reducer holds all of the currently selected cities
// in the discounts filter
const selectedCitiesReducer = (state = [], action) => {
  if (action.type === "SET_SELECTED_CITIES") {
    console.log("in selectedcities reducer", action.payload);
    return action.payload;
  } else {
    return state;
  }
};

// this reducer holds all of the currently selected categories
// in the discounts filter
const selectedCategoriesReducer = (state = [], action) => {
  if (action.type === "SET_SELECTED_CATEGORIES") {
    console.log("in selectedCat reducer", action.payload);
    return action.payload;
  } else {
    return state;
  }
};

export default combineReducers({
  selectedCitiesReducer,
  selectedCategoriesReducer,
});