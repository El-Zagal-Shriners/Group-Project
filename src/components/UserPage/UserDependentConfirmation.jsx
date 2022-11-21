import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function UserDependentConfirmation(props) {
  // Renders a modal to confirm if the user wants to remove the selected dependent account
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header className="bg-primary text-light" closeButton>
        <Modal.Title className="fw-bold">Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you would like to remove this dependent account?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => props.removeDependent(props.dependentId)}
        >
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDependentConfirmation;
