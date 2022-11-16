import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const [usernameIn, setUsernameIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: usernameIn,
        password: passwordIn,
        first_name: "Llyod",
        last_name: "The Unicorn",
        email: "sample-email@email.com",
        primary_member_id: 1,
        is_authorized: true,
        is_verified: true,
        review_pending: false,
        dues_paid: "2022-01-01",
        membership_number: "1111",
        admin_level: 4,
      },
    });
  }; // end registerUser

  return (
    <form
      className="d-flex flex-column align-items-center bg-light p-5 rounded-3 border border-2 border-primary shadow-lg mb-3"
      onSubmit={registerUser}
    >
      <h2 className="text-primary">Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label className="text-primary" htmlFor="username">
          Username:
          <input
            className="border-primary me-auto"
            type="text"
            name="username"
            value={usernameIn}
            required
            onChange={(event) => setUsernameIn(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="text-primary" htmlFor="password">
          Password:
          <input
            className="border-primary me-auto"
            type="password"
            name="password"
            value={passwordIn}
            required
            onChange={(event) => setPasswordIn(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input
          className="btn btn-primary"
          type="submit"
          name="submit"
          value="Register"
        />
      </div>
    </form>
  );
}

export default RegisterForm;
