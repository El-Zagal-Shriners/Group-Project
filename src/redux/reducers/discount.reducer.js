import { combineReducers } from "redux";

const memberDiscountsReducer = (state = [], action) => {
  if (action.type === "SET_MEMBER_DISCOUNTS") {
    return action.payload;
  } else {
    return state;
  }
};

const adminDiscountsReducer = (state = [], action) => {
  if (action.type === "SET_ADMIN_DISCOUNTS") {
    return action.payload;
  } else {
    return state;
  }
};

const adminDiscountsTracker = (state = [], action) => {
  if (action.type === "SET_DISCOUNT_TRACKER") {
    return action.payload;
  } else {
    return state;
  }
};

export default combineReducers({
  adminDiscountsReducer,
  memberDiscountsReducer,
  adminDiscountsTracker,
});
