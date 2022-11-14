const categoriesReducer = (state = [], action) => {
  if (action.type === "SET_CATEGORIES") {
    return action.payload;
  } else {
    return state;
  }
};

export default categoriesReducer;
