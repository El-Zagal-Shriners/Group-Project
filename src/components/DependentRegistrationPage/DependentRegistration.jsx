import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DependentRegistrationPage.css";

function DependentRegistrationPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameIn, setUsernameIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

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
      },
    });
  };

  return (
    <div class="container text-center">
      <h2 className="header">Dependent Registration Page</h2>
      <form onSubmit={createAccount} className="createAccount">
        <div class="container text-center">
          <input
            className="fs-4 text-primary"
            required
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            className="fs-4 text-primary"
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            className="fs-4 text-primary"
            required
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            className="fs-4 text-primary"
            required
            placeholder="Username"
            value={usernameIn}
            onChange={(event) => setUsernameIn(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            className="fs-4 text-primary"
            required
            placeholder="Password"
            value={passwordIn}
            onChange={(event) => setPasswordIn(event.target.value)}
          />
        </div>
        <div class="container text-center">
          <input
            className="btn"
            type="submit"
            name="submit"
            value="Create Account"
          />
        </div>
      </form>
    </div>
  );
}

export default DependentRegistrationPage;
