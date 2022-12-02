import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function RequestUsername(props) {
  // local state to hold the users email
  const [email, setEmail] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);
  const dispatch = useDispatch();
  // performs POST for sending email to the email the user supplies
  const sendResetEmail = (e) => {
    if(email){  
    dispatch({
        type: "SEND_USERNAME",
        payload: {
          email
        }
      });
      // clear local state
      setEmail("");
      setShowInvalid(false);
      // close the forgot username modal
      props.handleCloseForgotUsername(e);
    } else {
        setShowInvalid(true);
    }
  };
  // clears local state and closes modal
  const cancelRequestUsername = (e) => {
    setEmail("");
    props.handleCloseForgotUsername(e);
    setShowInvalid(false);
  };
  // render modal to enter an email and request the usernames for an email
  return (
    <Modal show={props.showForgotUsername} onHide={cancelRequestUsername}>
      <Modal.Header className="bg-primary">
        <Modal.Title className="fw-bold text-light">Forgot Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h4>
            Please enter your email address
          </h4>
          <hr />{" "}
          <em>
            Your username will be sent the email below.
          </em>
          {/* email input */}
          <FloatingLabel
            controlId="dependentEmailLabel"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              required
              type="email"
              placeholder="Username"
              isInvalid={showInvalid ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          {/* Message to indicate user needs to enter an email */}
          {showInvalid && (
            <p className="text-center text-muted">
              Please enter a valid email address...
            </p>
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        {/* Buttons to submit or cancel request a username */}
        <Button variant="primary" onClick={(e) => sendResetEmail(e)}>
          Submit
        </Button>
        <Button
          variant="outline-primary"
          onClick={(e) => cancelRequestUsername(e)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestUsername;