import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DependentRegistrationPage.css";
import Button from "react-bootstrap/Button";
import useSearchParams, { useParams } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";

function DependentRegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameIn, setUsernameIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const params = useParams();

  const createAccount = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: usernameIn,
        password: passwordIn,
        primary_member_id: params,
      },
    });
  };

  return (
    <>
      <UpdatedNavBar />

      <div class="container text-center">
        <h2 className="header">Dependent Registration Page</h2>
      </div>
      <form onSubmit={createAccount} className="createAccount">
        <div class="container text-center">
          <input
            required
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            required
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            required
            placeholder="Username"
            value={usernameIn}
            onChange={(event) => setUsernameIn(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            required
            placeholder="Password"
            value={passwordIn}
            onChange={(event) => setPasswordIn(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <Button variant="primary">Create Account</Button>
        </div>
      </form>
    </>
  );
}

export default DependentRegistrationPage;
