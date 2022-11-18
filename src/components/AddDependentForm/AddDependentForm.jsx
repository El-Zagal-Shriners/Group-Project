import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch }  from "react-redux";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function AddDependentForm() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    
    return (
        <Modal show={props.showEdit} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Please</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>
        Please enter the email address for who you want to add as dependent account.
        <FloatingLabel
            controlId="dependentEmailLabel"
            label="Email"
            className="mb-3"
        >
        <Form.Control type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
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
    )
}

export default AddDependentForm;