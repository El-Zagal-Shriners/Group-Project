import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

function ConfirmationModal({
  showConfirmation,
  setShowConfirmation,
  setShow,
  show,
  setEdit,
  edit,
  member,
}) {
  const dispatch = useDispatch();

  // deletes member
  const removeMember = () => {
    dispatch({
      type: "ADMIN_DELETE_MEMBER",
      payload: {
        memberId: member.id,
      },
    });
    setShowConfirmation(false);
    setShow(false); //maybe?
  };

  const handleClose = () => {
    if (edit === false && show === true) {
      setEdit(true);
    } else {
      setShow(true);
    }
    setShowConfirmation(false);
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showConfirmation}
      // onShow={() => setEdit(false)}
      backdrop="static"
    >
      <Modal.Header className="bg-primary text-light">
        Delete Member
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this Member?</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => removeMember()}>Delete</Button>
        <Button
          variant="outline-primary"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
