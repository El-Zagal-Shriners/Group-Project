import tokenReducer from "../src/redux/reducers/token.reducer";

describe("Testing tokenReducer", () => {
  test("Should have 'false' initial state", () => {
    let action = [];
    let returnedState = tokenReducer(undefined, action);
    expect(returnedState.tokenCheck).toEqual("false");
    expect(returnedState.passwordResetTokenCheck).toEqual("false");
  });

  test("Should receive a string to tokenCheck", () => {
    let action = { type: "SET_TOKEN_CHECK", payload: "stringtestone123" };
    let returnedState = tokenReducer(undefined, action);
    expect(returnedState.tokenCheck).toEqual("stringtestone123");
    expect(returnedState.passwordResetTokenCheck).toEqual("false");
  });

  test("Should receive an array to adminMemberReducer", () => {
    let action = {
      type: "SET_RESET_TOKEN_CHECK",
      payload: "stringtesttwo123",
    };
    let returnedState = tokenReducer(undefined, action);
    expect(returnedState.tokenCheck).toEqual("false");
    expect(returnedState.passwordResetTokenCheck).toEqual("stringtesttwo123");
  });

  test("Should clear tokenReducer", () => {
    let action = { type: "UNSET_TOKEN_CHECK" };
    let returnedState = tokenReducer(
      {
        tokenCheck: "stringtestone123",
        passwordResetTokenCheck: "false",
      },
      action
    );
    expect(returnedState.tokenCheck).toEqual("false");
  });

  test("Should clear tokenReducer", () => {
    let action = { type: "UNSET_RESET_TOKEN_CHECK" };
    let returnedState = tokenReducer(
      {
        tokenCheck: "false",
        passwordResetTokenCheck: "stringesttwo123",
      },
      action
    );
    expect(returnedState.passwordResetTokenCheck).toEqual("false");
  });
});
