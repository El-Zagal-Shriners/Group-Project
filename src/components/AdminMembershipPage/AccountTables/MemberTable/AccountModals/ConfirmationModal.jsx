import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

function ConfirmationModal({ show, setShow, memberId }) {
  const dispatch = useDispatch();

  // deletes member
  const removeMember = () => {
    dispatch({
      type: "ADMIN_DELETE_MEMBER",
      payload: {
        memberId: memberId,
      },
    });
    setShow(false);
  };

  return (
    <Modal show={show} backdrop={false}>
      <Modal.Header>Delete Member</Modal.Header>
      <Modal.Body>Are you sure you want to delete this Member?</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => removeMember()}>Delete</Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
