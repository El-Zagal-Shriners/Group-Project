import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import UpdatedNavBar from "../Nav/Nav";

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// This simply stops a user from being able to add the admin landing page
// Admin functions and server routes must be protected by admin middleware

function ProtectedAdminRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

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
        // Otherwise, display spinner while retrieving user
        <>
          <UpdatedNavBar />
          <div className="vw-100 text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        </>
      )}
    </Route>
  );
}

export default ProtectedAdminRoute;
