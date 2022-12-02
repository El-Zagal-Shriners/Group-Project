import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function RequestPasswordReset(props) {
  // local state to hold the dependent email address
  const [username, setUsername] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);
  const dispatch = useDispatch();
  // performs POST for sending email to the email the user supplies
  const sendResetEmail = (e) => {
    if (validateUsername(username) && username.length > 4) {
      dispatch({
        type: "SEND_RESET_PASSWORD_EMAIL",
        payload: {
          username,
        },
      });
      // clear local state
      setUsername("");
      setShowInvalid(false);
      // close the add reset password email modal
      props.handleCloseResetPassword(e);
    } else {
      setShowInvalid(true);
    }
  };
  // clears local state and closes modal
  const cancelRequestPassword = (e) => {
    setUsername("");
    props.handleCloseResetPassword(e);
  };
  // This function will check that the username is only characters or numbers
  // using regex
  const validateUsername = (username) => {
    return /^[A-Za-z0-9]*$/.test(username);
  };

  useEffect(() => {
    // Sets invalid to false if valid username
    // or true if username contains invalid characters
    // (anything other than characters or numbers)
    if (validateUsername(username)) {
      setShowInvalid(false);
    } else {
      setShowInvalid(true);
    }
  }, [username]);
  // render a modal with an input for entering a username for password reset
  return (
    <Modal show={props.showResetPassword} onHide={cancelRequestPassword}>
      <Modal.Header className="bg-primary">
        <Modal.Title className="fw-bold text-light">Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h4>
            Please enter your <strong>username</strong>
          </h4>
          <hr />{" "}
          <em>
            Password reset instructions will be sent to the email address on the
            account.
          </em>
          {/* Input for username */}
          <FloatingLabel
            controlId="dependentEmailLabel"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Username"
              value={username}
              isInvalid={showInvalid ? true : false}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          {/* message to indicate the username is invalid */}
          {showInvalid && (
            <p className="text-center text-muted">
              Username must be longer than 4 characters and CANNOT contain any
              special characters ie. !, $, %, #, @, etc...
            </p>
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        {/* Buttons for submitting or cancel password reset request */}
        <Button variant="primary" onClick={(e) => sendResetEmail(e)}>
          Submit
        </Button>
        <Button
          variant="outline-primary"
          onClick={(e) => cancelRequestPassword(e)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestPasswordReset;
