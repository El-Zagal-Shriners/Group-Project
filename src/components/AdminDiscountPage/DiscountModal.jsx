import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

function DiscountModal({ discount }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [description, setDescription] = useState(discount.description);
  const [startDate, setStartDate] = useState(discount.start_date);
  const [expDate, setExpDate] = useState(discount.expiration_date);
  const [discountCode, setDiscountCode] = useState(discount.discount_code);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // create edit discount object 
  const discountObj = {
    discountId: discount.id,
    description,
    startDate,
    expDate,
    discountCode,
  }
  // edit discount
  const editDiscount = () => {
    dispatch({
      type: "EDIT_DISCOUNT",
      payload: discountObj,
    });
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            label='Description'
          >
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </FloatingLabel>
          <FloatingLabel
            label="Start Date"
          >
          <Form.Control
            value={startDate}
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          </FloatingLabel>
          <FloatingLabel
            label="Expiration Date"
          >
          <Form.Control
            value={expDate}
            type="date"
            onChange={(e) => setExpDate(e.target.value)}
          />
          </FloatingLabel>
          <FloatingLabel
            label="Discount Code"
          >
          <Form.Control
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
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
