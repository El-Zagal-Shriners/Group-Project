import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// Setup config for credentials
const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchVendors() {
  try {
    // Store response from axios
    const response = yield axios.get("/api/vendors", config);
    // Send response to reducer
    yield put({ type: "SET_VENDORS", payload: response.data });
  } catch (error) {
    console.log("error caught in FETCH_VENDORS :>> ", error);
  }
} // End fetchVendors

// POST new vendor on ADD_VENDOR
function* addVendor(action) {
  try{
      yield axios.post(`/api/vendors`, action.payload, config);
      yield put({ type: "FETCH_VENDORS" });
  } catch (error){
      console.log('Error in adding vendor', error);
  }
}

// worker Saga will fire on "FETCH_VENDORS"

function* vendorSaga() {
  yield takeEvery("FETCH_VENDORS", fetchVendors);
  yield takeEvery("ADD_VENDOR", addVendor);
} // End vendorSaga

export default vendorSaga;
