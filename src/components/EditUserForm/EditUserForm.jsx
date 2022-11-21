import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function EditUserForm(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(props.user.username);
  const [email, setEmail] = useState(props.user.email);
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName] = useState(props.user.last_name);
  const [memberNumber, setMemberNumber] = useState(
    props.user.membership_number
  );

  // clears local state on submition of page
  const clearLocalState = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setMemberNumber("");
  };

  // Send object to the database on confirmation
  // Clear local state
  // Close modal with inputs
  const sendEdit = () => {
    dispatch({
      type: "EDIT_USER_INFO",
      payload: {
        username: username.toLowercase(),
        firstName,
        lastName,
        email,
        memberNumber,
      },
    });
    clearLocalState();
    props.handleCloseEdit();
  };
  // Reset input values to the user current information from database
  const cancelEdit = () => {
    setUsername(props.user.username);
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
    setMemberNumber(props.user.membership_number);
    props.handleCloseEdit();
  };
  // Render a modal with the users current information pre-filled
  return (
    <Modal show={props.showEdit} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>Edit User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <FloatingLabel
            controlId="usernameEditLabel"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="firstNameEditLabel"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="lastNameEditLabel"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="Email" label="Email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="membershipNumberEditLabel"
            label="Membership Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Shriner Membership Number"
              value={memberNumber}
              onChange={(e) => setMemberNumber(e.target.value)}
            />
          </FloatingLabel>
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={cancelEdit}>
          Cancel
        </Button>
        <Button variant="success" onClick={sendEdit}>
          Confirm Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserForm;
