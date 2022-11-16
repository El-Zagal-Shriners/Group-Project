import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./RegistrationForm.css";

function RegisterForm() {
  const [usernameIn, setUsernameIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");
  const [firstNameIn, setFirstNameIn] = useState("");
  const [lastNameIn, setLastNameIn] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [duesPaid, setDuesPaid] = useState("");
  const [memberNumber, setMemberNumber] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: usernameIn,
        password: passwordIn,
        first_name: firstNameIn,
        last_name: lastNameIn,
        email: emailIn,
        dues_paid: duesPaid,
        membership_number: memberNumber,
      },
    });
  }; // end registerUser

  return (
    <form
      className="d-flex flex-column align-items-center p-5 rounded-3 border border-2 border-primary shadow-lg mb-3 registration_background"
      onSubmit={registerUser}
    >
      <h2 className="text-primary">Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <FloatingLabel
          controlId="floatingInput"
          label="Username"
          className="mb-1 text-primary"
        >
          <Form.Control
            type="text"
            name="username"
            value={usernameIn}
            placeholder="Username"
            required
            onChange={(event) => setUsernameIn(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingFirstName"
          label="First Name"
          className="mb-1 text-primary"
        >
          <Form.Control
            type="text"
            name="firstName"
            value={firstNameIn}
            placeholder="First Name"
            required
            onChange={(event) => setFirstNameIn(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingLastName"
          label="Last Name"
          className="mb-1 text-primary"
        >
          <Form.Control
            type="text"
            name="lastName"
            value={lastNameIn}
            placeholder="Last Name"
            required
            onChange={(event) => setLastNameIn(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingEmail"
          label="Email"
          className="mb-1 text-primary"
        >
          <Form.Control
            type="email"
            name="emailIn"
            value={emailIn}
            placeholder="Email"
            required
            onChange={(event) => setEmailIn(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          className="mb-1 text-primary"
          controlId="floatingPassword"
          label="Password"
        >
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={passwordIn}
            required
            onChange={(event) => setPasswordIn(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingMemberNumber"
          label="Membership Number"
          className="mb-1 text-primary"
        >
          <Form.Control
            type="number"
            name="memberNumber"
            value={memberNumber}
            placeholder="Member Number"
            required
            onChange={(event) => setMemberNumber(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingDueDate"
          label="Most Recent Dues Paid"
          className="mb-1 text-primary"
        >
          <Form.Control
            type="date"
            name="duePaid"
            value={duesPaid}
            placeholder="Dues Paid"
            required
            onChange={(event) => setDuesPaid(event.target.value)}
          />
        </FloatingLabel>
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
