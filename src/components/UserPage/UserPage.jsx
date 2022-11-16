import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <UpdatedNavBar />
      <div className="container">
        <h2>Welcome, {user.first_name} {user.last_name}!</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Member Number: {user.membership_number}</p>
        <LogOutButton className="btn btn-outline-danger" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
