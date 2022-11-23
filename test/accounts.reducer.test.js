import accountsReducer from "../src/redux/reducers/accounts.reducer";

describe("Testing accountReducer", () => {
  test("Should have blank initial state", () => {
    let action = [];
    let returnedState = accountsReducer(undefined, action);
    expect(returnedState.accountDependents).toEqual([]);
    expect(returnedState.accountsReducer).toEqual([]);
  });

  test("Should receive an array to accountsReducer", () => {
    let action = { type: "FETCH_ACCOUNTS", payload: ["Cust1", "Cust2"] };
    let returnedState = accountsReducer(undefined, action);
    expect(returnedState.accountDependents).toEqual([]);
    expect(returnedState.accountsReducer).toEqual(["Cust1", "Cust2"]);
  });

  test("Should receive an array to accountDependents", () => {
    let action = { type: "SET_DEPENDENTS", payload: ["Cust1", "Cust2"] };
    let returnedState = accountsReducer(undefined, action);
    expect(returnedState.accountDependents).toEqual(["Cust1", "Cust2"]);
    expect(returnedState.accountsReducer).toEqual([]);
  });

  test("Should clear accountsReducer", () => {
    let action = { type: "UNSET_ACCOUNTS" };
    let returnedState = accountsReducer(
      {
        accountDependents: ["Cust1", "Cust2"],
        accountsReducer: ["Cust1", "Cust2"],
      },
      action
    );
    expect(returnedState.accountDependents).toEqual([]);
    expect(returnedState.accountsReducer).toEqual([]);
  });
});
