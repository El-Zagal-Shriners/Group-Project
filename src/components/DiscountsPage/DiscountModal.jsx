import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

function DiscountModal({
  thisDiscount,
  showDiscountModal,
  setShowDiscountModal,
}) {
  const [alreadyTracked, setAlreadyTracked] = useState(false);

  function handleShowCode() {
    if (alreadyTracked === false) {
      setCounter(counter + 1);
    }
    setAlreadyTracked(true);
  }
  return (
    <>
      <Modal
        show={showDiscountModal}
        onHide={() => setShowDiscountModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{thisDiscount.vendor_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {thisDiscount.address}
          {thisDiscount.city}
          {thisDiscount.state_code}
          {thisDiscount.zip}

          <hr />
          {thisDiscount.description}
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header onClick={() => handleShowCode()}>
                Show Discount Code
              </Accordion.Header>
              <Accordion.Body>
                !Make This Non-Nullable! <br />
                {thisDiscount.discount_code}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDiscountModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiscountModal;
