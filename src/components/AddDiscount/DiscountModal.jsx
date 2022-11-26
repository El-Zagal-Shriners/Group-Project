import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

function DiscountModal({
  setShowEditDiscount,
  showEditDiscount,
  discount,
  vendor,
}) {
  // const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [discountDescription, setDiscountDescription] = useState(
    discount.discount_description
  );
  const [discountSummary, setDiscountSummary] = useState(
    discount.discount_summary
  );
  const [startDate, setStartDate] = useState(
    discount.start_date === null ? "" : formatDate(discount.start_date)
  );
  const [expDate, setExpDate] = useState(
    discount.expiration_date === null
      ? ""
      : formatDate(discount.expiration_date)
  );
  const [discountUsage, setDiscountUsage] = useState(discount.discount_usage);
  const [showInvalid, setShowInvalid] = useState(false);
  // closes modal
  const handleClose = (e) => {
    e.preventDefault();
    setShowEditDiscount(false);
  };

  // create edit discount object
  const discountObj = {
    discountId: discount.id,
    discountDescription,
    discountSummary,
    startDate: startDate === "" ? null : startDate,
    expDate: expDate === "" ? null : expDate,
    discountUsage,
  };
  // edit discount
  const editDiscount = (e) => {
    e.preventDefault();
    if (discountSummary.length < 16) {
      dispatch({
        type: "EDIT_DISCOUNT",
        payload: discountObj,
      });
      setShowEditDiscount(false);
      setShowInvalid(false);
    } else {
      setShowInvalid(true);
    }
  };
  // remove discount
  const removeDiscount = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_DISCOUNT",
      payload: discount.id,
    });
    setShowEditDiscount(false);
  };
  // cleans up the date to only display yyyy/mm/dd
  function formatDate(dateDirty) {
    let niceDate = new Date(dateDirty);
    return niceDate.toISOString().split("T")[0];
  }
  useEffect(() => {
    // Sets both valid and invalid to false if only newPassword
    // has entry or both or empty
    if (discountSummary.length < 16) {
      setShowInvalid(false);
      return;
    } else {
      setShowInvalid(true);
    }
  }, [discountSummary]);

  return (
    <>
      <Modal show={showEditDiscount} onHide={() => setShowEditDiscount(false)}>
        <form onSubmit={editDiscount}>
          <Modal.Header>
            <Modal.Title className="text-primary">Edit Discount</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {vendor && (
              <h4 className="text-primary fw-bold mx-2">{vendor.name}</h4>
            )}
            <FloatingLabel className="text-primary" label="Summary">
              <Form.Control
                type="text"
                required
                value={discountSummary}
                isInvalid={showInvalid ? true : false}
                onChange={(e) => setDiscountSummary(e.target.value)}
              />
            </FloatingLabel>
            {showInvalid && <p>Summary must 15 or less characters</p>}
            <FloatingLabel className="text-primary" label="Description">
              <Form.Control
                type="text"
                required
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
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
            <FloatingLabel className="text-primary" label="Discount Usage">
              <Form.Control
                type="text"
                required
                value={discountUsage}
                onChange={(e) => setDiscountUsage(e.target.value)}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
            <Button variant="warning" onClick={removeDiscount}>
              Delete Discount
            </Button>
            <Button variant="outline-primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default DiscountModal;
