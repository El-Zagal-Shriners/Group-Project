import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

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
      <div>
        <input
          className="btn btn-primary"
          type="submit"
          name="submit"
          value="Log In"
        />
      </div>
    </form>
  );
}

export default LoginForm;