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
  const [showInvalid, setShowInvalid] = useState(false);

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
    // Checks if the username is valid and more than 4 characters
    if (validateUsername(username) && username.length > 4) {
      // Send updated user info
      dispatch({
      type: "EDIT_USER_INFO",
      payload: {
        username: username.toLowerCase(),
        firstName,
        lastName,
        email,
        memberNumber: memberNumber?memberNumber:null,
      },
    });
    // clear all local states
    clearLocalState();
    // close modal
    props.handleCloseEdit();
    } else {
      setShowInvalid(true);
    }
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
  // Reset input values to the user current information from database
  const cancelEdit = () => {
    setUsername(props.user.username);
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
    setMemberNumber(props.user.membership_number);
    setShowInvalid(false);
    props.handleCloseEdit();
  };
  // Render a modal with the users current information pre-filled
  return (
    <Modal show={props.showEdit} onHide={props.handleClose}>
      <Modal.Header className='bg-primary'>
        <Modal.Title className="text-light fw-bold">Edit User Information</Modal.Title>
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
              required
              isInvalid={showInvalid?true:false}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FloatingLabel>
          {showInvalid && <p className="text-center text-muted">Username must be longer than 4 characters and CANNOT contain any special characters ie. !, $, %, #, @, etc...</p>}
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
          {props.user.membership_number &&
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
          </FloatingLabel>}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={sendEdit}>
          Confirm Changes
        </Button>
        <Button variant="outline-primary" onClick={cancelEdit}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserForm;
