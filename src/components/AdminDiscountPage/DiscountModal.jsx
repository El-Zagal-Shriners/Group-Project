import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

function DiscountModal({ discount }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [discountDescription, setDiscountDescription] = useState(
    discount.discountDescription
  );
  const [discountSummary, setDiscountSummary] = useState(
    discount.discountSummary
  );
  const [startDate, setStartDate] = useState(discount.start_date);
  const [expDate, setExpDate] = useState(discount.expiration_date);
  const [discountUsage, setDiscountUsage] = useState(discount.discountUsage);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // create edit discount object
  const discountObj = {
    discountId: discount.id,
    discountDescription,
    discountSummary,
    startDate,
    expDate,
    discountUsage,
  };
  // edit discount
  const editDiscount = () => {
    dispatch({
      type: "EDIT_DISCOUNT",
      payload: discountObj,
    });
    setShow(false);
  };
  // remove discount
  const removeDiscount = () => {
    dispatch({
      type: "REMOVE_DISCOUNT",
      payload: discount.id,
    });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Edit Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="text-primary" label="Description">
            <Form.Control
              value={discountDescription}
              onChange={(e) => setDiscountDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="Summary">
            <Form.Control
              value={discountSummary}
              onChange={(e) => setDiscountSummary(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="Start Date">
            <Form.Control
              value={startDate}
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="Expiration Date">
            <Form.Control
              value={expDate}
              type="date"
              onChange={(e) => setExpDate(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="Discount Code">
            <Form.Control
              value={discountUsage}
              onChange={(e) => setDiscountUsage(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editDiscount}>
            Save Changes
          </Button>
          <Button variant="warning" onClick={removeDiscount}>
            Delete Discount
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiscountModal;
