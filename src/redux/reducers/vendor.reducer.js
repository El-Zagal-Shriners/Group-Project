const vendorReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_VENDORS':
        return action.payload;
      case 'UNSET_VENDORS':
        return [];
      default:
        return state;
    }
  };

  // vendors will be on the redux state at:
  // state.vendors
  export default vendorReducer;
