import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";

function EditUserForm(props) {
    const sendEdit = () => {
        dispatch({
          type: "EDIT_USER_INFO"
        });
        props.handleCloseEdit();
      }

    return (
        <Modal show={props.showEdit} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this dependent account?<br /> This can NOT be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendEdit}>
            Confirm Edit
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default EditUserForm;