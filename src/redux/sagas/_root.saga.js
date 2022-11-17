import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import citiesSaga from "./cities.saga";
import discountSaga from "./discount.saga";
import accountsSaga from "./accounts.saga";
import vendorSaga from "./vendor.saga";
import categoriesSaga from "./categories.saga";
import adminSaga from "./admin.saga";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    accountsSaga(), // accounts soga is now registered
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    discountSaga(),
    vendorSaga(),
    citiesSaga(),
    categoriesSaga(),
    adminSaga(),
  ]);
}
