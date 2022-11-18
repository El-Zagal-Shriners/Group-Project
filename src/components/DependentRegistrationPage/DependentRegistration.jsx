import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";

function DependentRegistrationPage() {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameIn, setUsernameIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    dispatch({
          type: "TOKEN_CHECK",
          payload: token
        });
  }, []);

  const createAccount = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_DEPENDENT",
      payload: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: usernameIn,
        password: passwordIn,
        token: token
      },
    });
  };

  return (
      <>
      <UpdatedNavBar />
      {user.tokenCheck === 'true'?
      <div className="container text-center">
        <h2 className="text-primary">Dependent Registration Form</h2>
        <form onSubmit={createAccount}>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="First Name"
          >
            <Form.Control
              type="name"
              placeholder="name@example.com"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingLastName"
            label="Last Name"
          >
            <Form.Control
              type="name"
              placeholder="name@example.com"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingEmail"
            label="Email"
          >
            <Form.Control
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingUsername"
            label="Username"
          >
            <Form.Control
              type="name"
              placeholder="name@example.com"
              value={usernameIn}
              onChange={(event) => setUsernameIn(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control
              type="name"
              placeholder="name@example.com"
              value={passwordIn}
              onChange={(event) => setPasswordIn(event.target.value)}
            />
          </FloatingLabel>
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
      </div>
      :
      <p>Not authorized</p>}
    </>
  );
}

export default DependentRegistrationPage;
