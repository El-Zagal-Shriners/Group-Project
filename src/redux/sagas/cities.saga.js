import { takeEvery, put } from "redux-saga/effects";
const axios = require("axios");

// route: /api/cities

// saga to direct actions to the correct sagas.
function* citiesSaga() {
  yield takeEvery("GET_ALL_CITIES", getAllCities);
  yield takeEvery("GET_CLOSE_CITIES", getCloseCities);
}

// saga to get all cities and store them in redux.
function* getAllCities() {
  try {
    // fetch all cities from the database.
    const response = yield axios.get("/api/cities");
    // store the cities into redux.
    yield put({ type: "SET_ALL_CITIES", payload: response.data });
  } catch (err) {
    console.log("Error in getting all cities", err);
  }
}

// saga to get cities closest to user.
function* getCloseCities(action) {
  try {
    // shorten the action.payload by assigning it to coords.
    const coords = action.payload;
    // console.log(coords);
    // fetch the closest cities.
    const response = yield axios.get(
      `/api/cities/close?lat=${coords.lat}&lng=${coords.lng}`
    );
    // store the closest cities in redux.
    yield put({ type: "SET_LOCATIONS", payload: response.data });
  } catch (err) {
    console.log("Error in getting cities closest to user", err);
  }
}

export default citiesSaga;
