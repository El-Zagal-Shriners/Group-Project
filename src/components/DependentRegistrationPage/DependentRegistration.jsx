import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";

function DependentRegistrationPage() {
  const user = useSelector((store) => store.user);
  const tokenCheck = useSelector((store) => store.tokenCheck.tokenCheck);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  // Checks if the token in url is valid
  useEffect(() => {
    dispatch({
      type: "TOKEN_CHECK",
      payload: token,
    });
  }, []);
  // POST that sends information from the form to the database
  const createAccount = (event) => {
    event.preventDefault();
    // makes sure the username is valid and long enough
    // then dispatch new dependent infomation to saga
    if (validateUsername(username) && username.length > 4) {
      // Send the user entered info and token to server for
      // validation and entry if valid
      dispatch({
        type: "ADD_DEPENDENT",
        payload: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username.toLowerCase(),
          password: password,
          token: token,
        },
      });
      // clear out local states after dispatching new info
      clearLocalState();
      // move user back to home page for login
      history.push("/");
    } else {
      setShowInvalid(true);
    }
  };

  useEffect(() => {
    // Sets both valid and invalid to false if only newPassword
    // has entry or both or empty
    if (validateUsername(username)) {
      setShowInvalid(false);
      return;
    } else {
      setShowInvalid(true);
    }
  }, [username]);

  // This function will check that the username is only characters or numbers
  // using regex
  const validateUsername = (username) => {
    return /^[A-Za-z0-9]*$/.test(username);
  };

  // This function will reset all local states to default(empty)
  const clearLocalState = () => {
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setShowInvalid(false);
  };

  return (
    <>
      <UpdatedNavBar />
      {/* Start Ternary */}
      {tokenCheck === "true" ? (
        <div className="container text-center">
          <h2 className="text-primary">Dependent Registration Form</h2>
          <form onSubmit={createAccount}>
            <FloatingLabel
              className="mb-1 text-primary"
              controlId="floatingFirstName"
              label="First Name"
            >
              <Form.Control
                type="text"
                placeholder="name@example.com"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoFocus
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-1 text-primary"
              controlId="floatingLastName"
              label="Last Name"
            >
              <Form.Control
                type="text"
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
                type="text"
                placeholder="name@example.com"
                value={username}
                isInvalid={showInvalid ? true : false}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FloatingLabel>
            {showInvalid && (
              <p className="text-center text-muted">
                Username must be longer than 4 characters and CANNOT contain any
                special characters ie. !, $, %, #, @, etc...
              </p>
            )}

            <FloatingLabel
              className="mb-1 text-primary"
              controlId="floatingPassword"
              label="Password"
            >
              <Form.Control
                type="password"
                placeholder="name@example.com"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FloatingLabel>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>
        </div>
      ) : (
        <h3>Link appears invalid! Please make to use the link in the email.</h3>
      )}
      {/* End ternary */}
    </>
  );
}

export default DependentRegistrationPage;
