import vendorReducer from "../src/redux/reducers/vendor.reducer";

describe("Testing vendorReducer", () => {
  test("Should have blank initial state", () => {
    let action = [];
    let returnedState = vendorReducer(undefined, action);
    expect(returnedState).toEqual([]);
  });

  test("Should receive an array to vendorReducer", () => {
    let action = { type: "SET_VENDORS", payload: ["Vend1", "Vend2"] };
    let returnedState = vendorReducer(undefined, action);
    expect(returnedState).toEqual(["Vend1", "Vend2"]);
  });

  test("Should clear vendorReducer", () => {
    let action = { type: "UNSET_VENDORS" };
    let returnedState = vendorReducer(["Vend1", "Vend2"], action);
    expect(returnedState).toEqual([]);
  });
});
