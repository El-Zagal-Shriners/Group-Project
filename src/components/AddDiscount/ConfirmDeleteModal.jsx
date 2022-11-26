import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ConfirmDeleteModal(props) {
    const handleClose = () => {
        props.hideThisModalToggleSetter(false);
        if (props.parentModalToggleSetter){
            props.parentModalToggleSetter(true);
        }
    }
  // Renders a modal to confirm if the user wants to remove the selected dependent account
  return (
    <Modal show={props.hideThisModalToggle} onHide={handleClose}>
      <Modal.Header className="bg-primary text-light" closeButton>
        <Modal.Title className="fw-bold">Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`Are you sure you would like to remove this ${props.deleteType}?`}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={(e) => props.deleteFunction(e)}
        >
          Confirm Delete
        </Button>
        <Button variant="outline-primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDeleteModal;