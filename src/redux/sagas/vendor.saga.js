import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchVendors() {
  try {
    // Setup config for credentials
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // Store response from axios
    const response = yield axios.get("/api/vendors", config);
    // Send response to reducer
    yield put({ type: "SET_VENDORS", payload: response.data });
  } catch (error) {
    console.log("error caught in FETCH_VENDORS :>> ", error);
  }
}

// worker Saga will fire on "FETCH_VENDORS"

function* vendorSaga() {
  yield takeEvery("FETCH_VENDORS", fetchVendors);
}

export default vendorSaga;
