import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch }  from "react-redux";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function AddDependentForm(props) {
    // local state to hold the dependent email address
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    // performs POST for sending email to the email the user supplies
    const sendDependentEmail = () => {
        dispatch({
            type: "SEND_DEPENDENT_EMAIL",
            payload: {
              email
            }
        });
        // clear local state
        setEmail('');
        // close the add dependent modal
        props.handleCloseDependent();
    }
    // clears local state and closes modal
    const cancelDependentAdd = () => {
        setEmail('');
        props.handleCloseDependent();
    }

    return (
        <Modal show={props.showAddDependent} onHide={props.handleCloseDependent}>
        <Modal.Header className="bg-primary">
          <Modal.Title className="fw-bold text-light">Dependent Email Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <>
        Please enter the email address for who you want to add as dependent account.
        <FloatingLabel
            controlId="dependentEmailLabel"
            label="Email"
            className="mt-4"
        >
        <Form.Control type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </FloatingLabel>
        </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={cancelDependentAdd}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendDependentEmail}>
            Add Dependent
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddDependentForm;