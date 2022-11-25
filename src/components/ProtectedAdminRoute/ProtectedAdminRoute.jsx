import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DiscountsPage from "../DiscountsPage/DiscountsPage";
import AdminLandingPage from "../AdminLandingPage/AdminLandingPage";

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// This simply stops a user from being able to add the admin landing page
// Admin functions and server routes must be protected by admin middleware

function ProtectedAdminRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  // Get component from props
  const ProtectedComponent = component || (() => children);

  return (
    <Route
      // Pass props to this route component
      {...props}
    >
      {user.id && user.admin_level > 0 ? (
        // If the user is logged in and has an administrative level, show the protected component
        <ProtectedComponent />
      ) : (
        // Otherwise, redirect to the Discounts page
        <AdminLandingPage />
      )}
    </Route>
  );
}

export default ProtectedAdminRoute;
