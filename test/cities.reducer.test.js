import citiesReducer from "../src/redux/reducers/cities.reducer";

describe("Testing citiesReducer", () => {
  test("Should have blank initial state", () => {
    let action = [];
    let returnedState = citiesReducer(undefined, action);
    expect(returnedState.allCitiesReducer).toEqual([]);
    expect(returnedState.closeCitiesReducer).toEqual([]);
  });

  test("Should receive an array to citiesReducer", () => {
    let action = { type: "SET_ALL_CITIES", payload: ["City1", "City2"] };
    let returnedState = citiesReducer(undefined, action);
    expect(returnedState.allCitiesReducer).toEqual(["City1", "City2"]);
    expect(returnedState.closeCitiesReducer).toEqual([]);
  });

  test("Should receive an array to accountDependents", () => {
    let action = { type: "SET_CLOSE_CITIES", payload: ["City1", "City2"] };
    let returnedState = citiesReducer(undefined, action);
    expect(returnedState.allCitiesReducer).toEqual([]);
    expect(returnedState.closeCitiesReducer).toEqual(["City1", "City2"]);
  });

  test("Should clear citiesReducer", () => {
    let action = { type: "UNSET_CITIES" };
    let returnedState = citiesReducer(
      {
        allCitiesReducer: ["City1", "City2"],
        closeCitiesReducer: ["City1", "City2"],
      },
      action
    );
    expect(returnedState.allCitiesReducer).toEqual([]);
    expect(returnedState.closeCitiesReducer).toEqual([]);
  });
});
