import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import discounts from "./discount.reducer";
import accounts from "./accounts.reducer";
import vendors from "./vendor.reducer";
import cities from "./cities.reducer";
import categories from "./categories.reducer";
import filter from "./filter.reducer";
import tokenCheck from "./token.reducer";
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  accounts, // contains all account information for members and dependents
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  discounts, // contains all discounts from database
  vendors, // will be an array of objects for vendors
  cities, // contains the allCitiesReducer and closeCitiesReducer
  categories,
  filter,
  tokenCheck,
});

export default rootReducer;
