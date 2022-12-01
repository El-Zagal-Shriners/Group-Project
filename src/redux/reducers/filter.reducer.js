import { combineReducers } from "redux";

//this reducer holds all of the currently selected cities
// in the discounts filter
const selectedCitiesReducer = (state = [], action) => {
  if (action.type === "SET_SELECTED_CITIES") {
    // console.log("in selectedcities reducer", action.payload);
    return action.payload;
  } else if (action.type === "UNSET_DISCOUNTS") {
    return [];
  } else {
    return state;
  }
};

// this reducer holds all of the currently selected categories
// in the discounts filter
const selectedCategoriesReducer = (state = [], action) => {
  if (action.type === "SET_SELECTED_CATEGORIES") {
    // console.log("in selectedCat reducer", action.payload);
    return action.payload;
  } else if (action.type === "UNSET_DISCOUNTS") {
    return [];
  } else {
    return state;
  }
};

// Reducer to store filtered discounts
const filteredDiscountsReducer = (state = [], action) => {
  if (action.type === "SET_FILTERED_DISCOUNTS") {
    // console.log("in filteredDiscounts reducer", action.payload);
    return action.payload;
  } else if (action.type === "UNSET_DISCOUNTS") {
    return [];
  } else {
    return state;
  }
};

export default combineReducers({
  selectedCitiesReducer,
  selectedCategoriesReducer,
  filteredDiscountsReducer,
});
