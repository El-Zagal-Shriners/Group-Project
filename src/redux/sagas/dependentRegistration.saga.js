import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//ADD_DEPENDENT to fire with /api/registration/dependent route
function* addDependent(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    yield axios.post("/api/registration/dependent", action.payload, config);
    yield put({ type: "ADD_DEPENDENT" });
  } catch (error) {
    console.log("Error POSTING dependent registration:", error);
  }
}

// ADD_DEPENDENT to connect with client-side input values
function* dependentSaga() {
  yield takeEvery("ADD_DEPENDENT", addDependent);
}

export default dependentSaga;
