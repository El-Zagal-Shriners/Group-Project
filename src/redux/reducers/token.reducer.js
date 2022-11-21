const tokenCheck = (state = 'false', action) => {
    switch (action.type) {
      case "SET_TOKEN_CHECK":
        return String(action.payload);
      case "UNSET_TOKEN_CHECK":
        return 'false';
      default:
        return state;
    }
  };

  export default tokenCheck;
  