import userReducer from "../src/redux/reducers/user.reducer";

describe("Testing userReducer", () => {
  test("Should have blank initial state", () => {
    let action = {};
    let returnedState = userReducer(undefined, action);
    expect(returnedState).toEqual({});
  });

  test("Should receive an object to userReducer", () => {
    let action = {
      type: "SET_USER",
      payload: {
        username: "test",
        first_name: "Llyod",
        last_name: "theUnicorn",
      },
    };
    let returnedState = userReducer(undefined, action);
    expect(returnedState.username).toEqual("test");
    expect(returnedState.first_name).toEqual("Llyod");
    expect(returnedState.last_name).toEqual("theUnicorn");
  });

  test("Should clear userReducer", () => {
    let action = { type: "UNSET_USER" };
    let returnedState = userReducer(
      { username: "test", first_name: "Llyod", last_name: "theUnicorn" },
      action
    );
    expect(returnedState).toEqual({});
  });
});
