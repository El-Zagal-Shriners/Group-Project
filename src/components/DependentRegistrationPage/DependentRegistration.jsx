import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DependentRegistrationPage.css";
import UpdatedNavBar from "../Nav/Nav";

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
    <>
      <UpdatedNavBar />

      <div>
        <h2 className="header">Dependent Registration Page</h2>

        <form onSubmit={createAccount} className="createAccount">
          <input
            required
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            required
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <input
            required
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            required
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DependentRegistrationPage;
