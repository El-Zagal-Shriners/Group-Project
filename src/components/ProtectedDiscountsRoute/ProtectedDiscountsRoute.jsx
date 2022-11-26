import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { useSelector } from "react-redux";
import RequestReviewPage from "../RequestReviewPage/RequestReviewPage";
import UnverifiedUserPage from "../UnverifiedUserPage/UnverifiedUserPage";

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedDiscountsRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  // This function will determine if the user is in good standing,
  // account is turned off or they are a new account waiting for authorization
  const determineUserStatus = () => {
    if (user.id && user.full_authorized && user.is_verified){
        return <ProtectedComponent />
    } else if (user.id && !user.full_authorized && user.is_verified){
        return <RequestReviewPage />
    } else if (user.id && !user.full_authorized && !user.is_verified){
        return <UnverifiedUserPage />
    }
  }

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {determineUserStatus()}
    </Route>
  );
}

export default ProtectedDiscountsRoute;
