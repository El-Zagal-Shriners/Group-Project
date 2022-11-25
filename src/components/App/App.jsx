import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DiscountsPage from "../DiscountsPage/DiscountsPage";

import "./App.css";
import AdminLandingPage from "../AdminLandingPage/AdminLandingPage";
import AdminMembershipPage from "../AdminMembershipPage/AdminMembershipPage";
import AdminDiscountPage from "../AdminDiscountPage/AdminDiscountPage";
import AdminTrackingPage from "../AdminTrackingPage/AdminTrackingPage";
import DependentRegistrationPage from "../DependentRegistrationPage/DependentRegistration";
import ProtectedAdminRoute from "../ProtectedAdminRoute/ProtectedAdminRoute";
import AddVendor from "../AddVendor/AddVendor";
import AddDiscount from "../AdminDiscountPage/AddDiscount";
import AddVendorModal from "../AddVendor/AddVendor";
import PasswordResetPage from "../PasswordResetPage/PasswordResetPage";
import ProtectedDiscountsRoute from "../ProtectedDiscountsRoute/ProtectedDiscountsRoute";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedDiscountsRoute
            // logged in brings users to DiscountsPage else shows LoginPage
            exact
            path="/discounts"
          >
            <DiscountsPage />
          </ProtectedDiscountsRoute>

          <ProtectedAdminRoute
            // logged in brings users to Admin Page else shows LoginPage
            exact
            path="/admin"
          >
            <AdminLandingPage />
          </ProtectedAdminRoute>

          <ProtectedAdminRoute
            // logged in brings users to Admin Membership Page else shows LoginPage
            exact
            path="/adminmembership"
          >
            <AdminMembershipPage />
          </ProtectedAdminRoute>

          <ProtectedAdminRoute
            // logged in brings users to Admin Discounts Page else shows LoginPage
            exact
            path="/admindiscounts"
          >
            <AdminDiscountPage />
          </ProtectedAdminRoute>

          <ProtectedAdminRoute
            // logged in brings users to Admin Tracker else shows LoginPage
            exact
            path="/admintracking"
          >
            <AdminTrackingPage />
          </ProtectedAdminRoute>

          <ProtectedAdminRoute
            // logged in brings users to Admin Tracker else shows LoginPage
            exact
            path="/adminaddvendor"
          >
            <AddVendorModal />
          </ProtectedAdminRoute>
          <ProtectedAdminRoute
            // logged in brings users to Admin Tracker else shows LoginPage
            exact
            path="/adminadddiscount"
          >
            <AddDiscount />
          </ProtectedAdminRoute>

          <Route exact path="/dependents/:token">
            <DependentRegistrationPage />
          </Route>

          <Route exact path="/reset/:token">
            <PasswordResetPage />
          </Route>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/discounts" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/discounts" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/discounts" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
