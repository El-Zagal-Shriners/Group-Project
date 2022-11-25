import categoriesReducer from "../src/redux/reducers/categories.reducer";

describe("Testing categoriesReducer", () => {
  test("Should have blank initial state", () => {
    let action = [];
    let returnedState = categoriesReducer(undefined, action);
    expect(returnedState).toEqual([]);
  });

  test("Should receive an array to categoriesReducer", () => {
    let action = { type: "SET_CATEGORIES", payload: ["Cat1", "Cat2"] };
    let returnedState = categoriesReducer(undefined, action);
    expect(returnedState).toEqual(["Cat1", "Cat2"]);
  });

  test("Should clear categoriesReducer", () => {
    let action = { type: "UNSET_CATEGORIES" };
    let returnedState = categoriesReducer(["Cat1", "Cat2"], action);
    expect(returnedState).toEqual([]);
  });
});
