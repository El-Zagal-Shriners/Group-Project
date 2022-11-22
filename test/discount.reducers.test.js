import discountReducer from "../src/redux/reducers/discount.reducer";

describe("Testing discountReducer", () => {
  test("Should have blank initial state", () => {
    let action = [];
    let returnedState = discountReducer(undefined, action);
    expect(returnedState.memberDiscountsReducer).toEqual([]);
    expect(returnedState.adminDiscountsReducer).toEqual([]);
  });

  test("Should receive an array to discountMemberReducer", () => {
    let action = { type: "SET_MEMBER_DISCOUNTS", payload: ["Disc1", "Disc2"] };
    let returnedState = discountReducer(undefined, action);
    expect(returnedState.memberDiscountsReducer).toEqual(["Disc1", "Disc2"]);
    expect(returnedState.adminDiscountsReducer).toEqual([]);
  });

  test("Should receive an array to adminMemberReducer", () => {
    let action = { type: "SET_ADMIN_DISCOUNTS", payload: ["Disc1", "Disc2"] };
    let returnedState = discountReducer(undefined, action);
    expect(returnedState.memberDiscountsReducer).toEqual([]);
    expect(returnedState.adminDiscountsReducer).toEqual(["Disc1", "Disc2"]);
  });

  test("Should clear citiesReducer", () => {
    let action = { type: "UNSET_DISCOUNTS" };
    let returnedState = discountReducer(
      {
        memberDiscountsReducer: ["Disc1", "Disc2"],
        adminDiscountsReducer: ["Disc1", "Disc2"],
      },
      action
    );
    expect(returnedState.memberDiscountsReducer).toEqual([]);
    expect(returnedState.adminDiscountsReducer).toEqual([]);
  });
});
