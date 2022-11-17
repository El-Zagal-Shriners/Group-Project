import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// GET all discounts for use in member discount page
// Includes relevent vendor and category information as well
function* getMemberDiscounts() {
  try {
    console.log("In member discounts saga");
    const discounts = yield axios.get(`api/discounts/member`);
    yield put({
      type: "SET_MEMBER_DISCOUNTS",
      payload: discounts.data,
    });
  } catch (err) {
    console.log("Error setting member discounts: ", err);
  }
} // End getAdminDiscounts

// GET all discounts will calculated usage stats from database
function* getAdminDiscounts() {
  try {
    console.log("In admin discounts saga");
    const discounts = yield axios.get(`api/discounts/admin`);
    yield put({
      type: "SET_ADMIN_DISCOUNTS",
      payload: discounts.data,
    });
  } catch (err) {
    console.log("Error settin admin discounts: ", err);
  }
} // End getAdminDiscounts

// POST a new discount to the discount table in database
function* addDiscount(action) {
  try {
    console.log("In add discount");
    yield axios.post(`api/discounts/`, action.payload);
    yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
    console.log("Error adding discount: ", err);
  }
} // End addDiscount

// PUT to edit an existing discount by discount_id
function* editDiscount(action) {
  try {
    console.log("In edit discount with: ", action.payload);
    yield axios.put(`api/discounts`, action.payload);
    yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
    console.log("Error editing discount: ", err);
  }
} // End edit discount

// DELETE to remove a discount by id
function* removeDiscount(action) {
  try {
    console.log("In remove discount with: ", action.payload);
    yield axios.delete(`api/discounts/${action.payload}`);
    yield put({ type: "GET_DISCOUNTS" });
  } catch (err) {
    console.log("Error removing discount: ", err);
  }
} // End remove a discount

// GET to server to fetch all discount tracking info
function* fetchDiscountTracker(action) {
  try {
    const results = yield axios.get(
      "api/discounts/admindiscounttracker",
      config
    );
    yield put({ type: "SET_DISCOUNT_TRACKER", payload: results.data });
  } catch (error) {
    console.log("error caught in fetchDiscountTracker :>> ", error);
  }
}

function* discountSaga() {
  yield takeLatest("GET_MEMBER_DISCOUNTS", getMemberDiscounts);
  yield takeLatest("GET_ADMIN_DISCOUNTS", getAdminDiscounts);
  yield takeLatest("ADD_DISCOUNT", addDiscount);
  yield takeLatest("EDIT_DISCOUNT", editDiscount);
  yield takeLatest("REMOVE_DISCOUNT", removeDiscount);
  yield takeLatest("FETCH_DISCOUNT_TRACKER", fetchDiscountTracker);
}

export default discountSaga;
