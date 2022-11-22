import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RequestPasswordReset from "../RequestPasswordReset/RequestPasswordReset";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    // event.preventDefault();

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
  }
  // Toggle local 'showResetPassword' state
  const handleCloseResetPassword = (event) => {
    event.preventDefault();
    setShowResetPassword(false);
  }

  return (
    <form
      className="d-flex flex-column align-items-center bg-light p-5 rounded-3 border border-2 border-primary shadow-lg mb-3"
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
            className="border-primary me-auto"
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
            className="border-primary w-auto me-auto"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div className="d-flex justify-content-between">
        {/* Button to toggle modal for password reset */}
        <button type='button' className="btn btn-outline-primary mx-1" onClick={(e)=>handleShowResetPassword(e)}>Forgot Password?</button>
        {/* Modal for password reset */}
        <RequestPasswordReset handleCloseResetPassword={handleCloseResetPassword} showResetPassword={showResetPassword}/>
        <button
          className="btn btn-primary mx-1"
          type="submit"
        >Log In
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
