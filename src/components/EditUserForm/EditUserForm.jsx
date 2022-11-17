import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function EditUserForm(props) {
    const dispatch = useDispatch();
    const sendEdit = () => {
        dispatch({
          type: "EDIT_USER_INFO"
        });
        props.handleCloseEdit();
      }

    return (
        <Modal show={props.showEdit} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>
        <FloatingLabel
            controlId="usernameEditLabel"
            label="Username"
            className="mb-3"
        >
        <Form.Control type="text" placeholder="Username" />
        </FloatingLabel>
        <FloatingLabel
            controlId="firstNameEditLabel"
            label="First Name"
            className="mb-3"
        >
        <Form.Control type="text" placeholder="First Name" />
        </FloatingLabel>
        <FloatingLabel
            controlId="lastNameEditLabel"
            label="Last Name"
            className="mb-3"
        >
        <Form.Control type="text" placeholder="Last Name" />
        </FloatingLabel>
        <FloatingLabel
            controlId="Email"
            label="Email"
            className="mb-3"
        >
        <Form.Control type="email" placeholder="Email" />
        </FloatingLabel>
        <FloatingLabel
            controlId="membershipNumberEditLabel"
            label="Membership Number"
            className="mb-3"
        >
        <Form.Control type="text" placeholder="Shriner Membership Number" />
        </FloatingLabel>
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendEdit}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditUserForm;