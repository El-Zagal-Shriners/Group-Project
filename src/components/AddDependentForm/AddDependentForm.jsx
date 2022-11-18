import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch }  from "react-redux";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function AddDependentForm(props) {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const sendDependentEmail = () => {
        dispatch({
            type: "SEND_DEPENDENT_EMAIL",
            payload: {
              email
            }
        });
        setEmail('');
        props.handleCloseDependent();
    }

    const cancelDependentAdd = () => {
        setEmail('');
        props.handleCloseDependent();
    }

    return (
        <Modal show={props.showAddDependent} onHide={props.handleCloseDependent}>
        <Modal.Header>
          <Modal.Title>Dependent Email Entry</Modal.Title>
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
          <Button variant="danger" onClick={cancelDependentAdd}>
            Cancel
          </Button>
          <Button variant="success" onClick={sendDependentEmail}>
            Add Dependent
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddDependentForm;