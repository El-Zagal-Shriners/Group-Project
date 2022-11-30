import { combineReducers } from "redux";

// Reducer to store member discounts
const memberDiscountsReducer = (state = [], action) => {
  if (action.type === "SET_MEMBER_DISCOUNTS") {
    return action.payload;
  } else if (action.type === "UNSET_DISCOUNTS") {
    return [];
  } else {
    return state;
  }
};

// Reducer to store admin discounts
const adminDiscountsReducer = (state = [], action) => {
  if (action.type === "SET_ADMIN_DISCOUNTS") {
    return action.payload;
  } else if (action.type === "UNSET_DISCOUNTS") {
    return [];
  } else {
    return state;
  }
};

export default combineReducers({
  adminDiscountsReducer,
  memberDiscountsReducer,
});
