import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RequestPasswordReset from "../RequestPasswordReset/RequestPasswordReset";
import RequestUsername from "../RequestUsername/RequestUsername";
import './LoginForm.css'

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showForgotUsername, setShowForgotUsername] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username.toLowerCase(),
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  // Toggle local 'showResetPassword' state
  const handleShowResetPassword = (event) => {
    event.preventDefault();
    setShowResetPassword(true);
  };
  // Toggle local 'showResetPassword' state
  const handleCloseResetPassword = (event) => {
    event.preventDefault();
    setShowResetPassword(false);
  };
    // Toggle local 'showResetPassword' state
    const handleShowForgotUsername = (event) => {
      event.preventDefault();
      setShowForgotUsername(true);
    };
    // Toggle local 'showResetPassword' state
    const handleCloseForgotUsername = (event) => {
      event.preventDefault();
      setShowForgotUsername(false);
    };

  return (
    <form
      className="d-flex flex-column align-items-center bg-light px-5 py-3 rounded-3 border border-2 border-primary shadow-lg mb-3"
      onSubmit={login}
    >
      <h2 className="text-primary">Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label className="text-primary" htmlFor="username">
          Username:
          <input
            className="border-primary me-auto rounded-2"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label className="text-primary" htmlFor="password">
          Password:
          <input
            className="border-primary w-auto me-auto rounded-2"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div className="d-flex flex-column justify-content-between">
        {/* Button to toggle modal for password reset */}
        <button className="btn btn-primary mx-1 mt-3" type="submit">
          Log In
        </button>
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn-link btn mx-1 forgotBtn"
            onClick={(e) => handleShowForgotUsername(e)}
          >
            Forgot Username?
          </button>
          <button
            type="button"
            className="btn-link btn mx-1 forgotBtn"
            onClick={(e) => handleShowResetPassword(e)}
          >
            Forgot Password?
          </button>
        </div>
        <RequestUsername
          handleCloseForgotUsername={handleCloseForgotUsername}
          showForgotUsername={showForgotUsername}
        />
        {/* Modal for password reset */}
        <RequestPasswordReset
          handleCloseResetPassword={handleCloseResetPassword}
          showResetPassword={showResetPassword}
        />
      </div>
    </form>
  );
}

export default LoginForm;
