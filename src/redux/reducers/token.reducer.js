import { combineReducers } from "redux";

// reducer for if dependent registration token is valid
const tokenCheck = (state = "false", action) => {
  switch (action.type) {
    case "SET_TOKEN_CHECK":
      return String(action.payload);
    case "UNSET_TOKEN_CHECK":
      return "false";
    default:
      return state;
  }
};
// Reducer for if password reset token is valid
const passwordResetTokenCheck = (state = "false", action) => {
  switch (action.type) {
    case "SET_RESET_TOKEN_CHECK":
      return String(action.payload);
    case "UNSET_RESET_TOKEN_CHECK":
      return "false";
    default:
      return state;
  }
};

export default combineReducers({
  tokenCheck,
  passwordResetTokenCheck,
});
