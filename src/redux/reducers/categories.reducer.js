// Reducer to store categories
const categoriesReducer = (state = [], action) => {
  if (action.type === "SET_CATEGORIES") {
    return action.payload;
  } else if (action.type === "UNSET_CATEGORIES") {
    return [];
  } else {
    return state;
  }
};

export default categoriesReducer;
