import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};
//ADD_DEPENDENT to fire with /api/registration/dependent route
function* addDependent(action) {
  try {
    yield axios.post("/api/register/dependent", action.payload, config);
    yield put({ type: "ADD_DEPENDENT" });
  } catch (error) {
    console.log("Error POSTING dependent registration:", error);
  }
}

function* sendDependentEmail(action) {
  try {
    yield axios.post("/api/register/dependent/email", action.payload, config);
  } catch (error) {
    console.log("Error in saga POST for dependent email:", error);
  }
}

// ADD_DEPENDENT to connect with client-side input values
function* dependentSaga() {
  yield takeEvery("ADD_DEPENDENT", addDependent);
  yield takeEvery("SEND_DEPENDENT_EMAIL", sendDependentEmail);
}

export default dependentSaga;
