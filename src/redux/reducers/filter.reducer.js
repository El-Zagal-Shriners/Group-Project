const filterReducer = (state = {}, action) => {
  if (action.type === "SET_FILTER_PARAMS") {
    console.log("in filter reducer", action.payload);
    return action.payload;
  } else {
    return state;
  }
};

export default filterReducer;
