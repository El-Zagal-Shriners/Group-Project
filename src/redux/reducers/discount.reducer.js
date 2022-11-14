import { combineReducers } from "redux";

const discountsReducer = (state = [], action) => {
  if (action.type === "SET_DISCOUNTS") {
    return action.payload;
  } else {
    return state;
  }
};

export default combineReducers({
  discountsReducer,
});
