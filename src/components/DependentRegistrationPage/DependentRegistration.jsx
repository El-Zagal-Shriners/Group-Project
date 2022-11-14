import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function DependentRegistrationPage(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const createAccount = (event) => {
    event.preventDefault();
    console.log(`dependent registration page`, { firstName, lastName });

    dispatch({
      //need to find type:
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
      },
    });
  };

  return (
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
            <button type="submit">
                Create Account
            </button>
        </div>
      </form>
    </div>
  );
}

export default DependentRegistrationPage

//SELECT "username", "password", "first_name", "last_name",
// "email" FROM "user";
