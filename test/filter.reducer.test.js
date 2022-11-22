import filterReducer from "../src/redux/reducers/filter.reducer";

describe("Testing filterReducer", () => {
  test("Should have blank initial state", () => {
    let action = [];
    let returnedState = filterReducer(undefined, action);
    expect(returnedState.selectedCitiesReducer).toEqual([]);
    expect(returnedState.selectedCategoriesReducer).toEqual([]);
    expect(returnedState.filteredDiscountsReducer).toEqual([]);
  });

  test("Should receive an array to selectedCitiesReducer", () => {
    let action = { type: "SET_SELECTED_CITIES", payload: ["City1", "City2"] };
    let returnedState = filterReducer(undefined, action);
    expect(returnedState.selectedCitiesReducer).toEqual(["City1", "City2"]);
    expect(returnedState.selectedCategoriesReducer).toEqual([]);
    expect(returnedState.filteredDiscountsReducer).toEqual([]);
  });

  test("Should receive an array to adminMemberReducer", () => {
    let action = {
      type: "SET_SELECTED_CATEGORIES",
      payload: ["Cat1", "Cat2"],
    };
    let returnedState = filterReducer(undefined, action);
    expect(returnedState.selectedCitiesReducer).toEqual([]);
    expect(returnedState.selectedCategoriesReducer).toEqual(["Cat1", "Cat2"]);
    expect(returnedState.filteredDiscountsReducer).toEqual([]);
  });

  test("Should receive an array to adminMemberReducer", () => {
    let action = {
      type: "SET_FILTERED_DISCOUNTS",
      payload: ["Disc1", "Disc2"],
    };
    let returnedState = filterReducer(undefined, action);
    expect(returnedState.selectedCitiesReducer).toEqual([]);
    expect(returnedState.selectedCategoriesReducer).toEqual([]);
    expect(returnedState.filteredDiscountsReducer).toEqual(["Disc1", "Disc2"]);
  });

  test("Should clear citiesReducer", () => {
    let action = { type: "UNSET_DISCOUNTS" };
    let returnedState = filterReducer(
      {
        selectedCitiesReducer: ["City1", "City2"],
        selectedCategoriesReducer: ["Cat1", "Cat2"],
        filteredDiscountsReducer: ["Disc1", "Disc2"],
      },
      action
    );
    expect(returnedState.selectedCitiesReducer).toEqual([]);
    expect(returnedState.selectedCategoriesReducer).toEqual([]);
    expect(returnedState.filteredDiscountsReducer).toEqual([]);
  });
});
