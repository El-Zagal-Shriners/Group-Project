import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";

function DiscountModal({ discount }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [description, setDescription] = useState(discount.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // edit discount
  const editDiscount = () => {
    dispatch({
      type: "EDIT_DISCOUNT",
      payload: { description: description, discountId: discount.id },
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
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
