import { useEffect } from "react";
import { Modal } from "react-bootstrap";

function SuccessModal({ showSuccess, setShowSuccess }) {
  return (
    <Modal
      show={showSuccess}
      onShow={() =>
        setTimeout(() => {
          setShowSuccess(false);
        }, 1500)
      }
      onHide={() => setShowSuccess(false)}
    >
      <Modal.Body className="bg-success text-light">
        Member Successfully Updated
      </Modal.Body>
    </Modal>
  );
}

export default SuccessModal;
