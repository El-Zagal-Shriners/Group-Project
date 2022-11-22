import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function RequestPasswordReset(props) {
  // local state to hold the dependent email address
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  // performs POST for sending email to the email the user supplies
  const sendResetEmail = (e) => {
    dispatch({
      type: "SEND_RESET_PASSWORD_EMAIL",
      payload: {
        username,
      },
    });
    // clear local state
    setUsername("");
    // close the add reset password email modal
    props.handleCloseResetPassword(e);
  };
  // clears local state and closes modal
  const cancelRequestPassword = (e) => {
    setUsername("");
    props.handleCloseResetPassword(e);
  };

  return (
    <Modal show={props.showResetPassword} onHide={cancelRequestPassword}>
      <Modal.Header className="bg-primary">
        <Modal.Title className="fw-bold text-light">Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <h4>Please enter your <strong>username</strong></h4><hr/> <em>Password reset instructions will be sent to the email address on the account.</em>
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
              onChange={(e) => setUsername(e.target.value)}
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
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RequestPasswordReset;
