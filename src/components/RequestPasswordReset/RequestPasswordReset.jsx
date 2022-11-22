import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function RequestPasswordReset(props) {
  // local state to hold the dependent email address
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  // performs POST for sending email to the email the user supplies
  const sendResetEmail = (e) => {
    dispatch({
      type: "SEND_RESET_PASSWORD_EMAIL",
      payload: {
        email,
      },
    });
    // clear local state
    setEmail("");
    // close the add reset password email modal
    props.handleCloseResetPassword(e);
  };
  // clears local state and closes modal
  const cancelRequestPassword = (e) => {
    setEmail("");
    props.handleCloseResetPassword(e);
  };

  return (
    <Modal show={props.showResetPassword} onHide={cancelRequestPassword}>
      <Modal.Header className="bg-primary">
        <Modal.Title className="fw-bold text-light">Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          Please enter your email address.
          <FloatingLabel
            controlId="dependentEmailLabel"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={(e) => cancelRequestPassword(e)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={(e) => sendResetEmail(e)}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestPasswordReset;
