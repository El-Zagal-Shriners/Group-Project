import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";

function UserDependentConfirmation(props) {
    const dispatch = useDispatch();

    const removeDependent = (id) => {
        dispatch({
          type: "REMOVE_DEPENDENT",
          payload: id
        });
        props.handleClose();
      }
    
    return (
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this dependent account?<br /> This can NOT be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>removeDependent(props.dependentId)}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export default UserDependentConfirmation;