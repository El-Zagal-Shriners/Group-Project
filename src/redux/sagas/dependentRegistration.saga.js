import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

//ADD_DEPENDENT to fire with /api/registraion/dependent route
function* addDependent(action) {
  try {
    yield axios.post("/api/registration/dependent", action.payload);
    yield put({ type: "ADD_DEPENDENT" });
  } catch (error) {
    console.log("Error POSTING dependent regisration:", error);
  }
}

// ADD_DEPENDENT to connect with client-side input values
function* dependentSaga() {
  yield takeEvery("ADD_DEPENDENT", addDependent);
}

export default dependentSaga;
