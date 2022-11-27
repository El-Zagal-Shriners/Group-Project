import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function DiscountModal({
  setShowEditDiscount,
  showEditDiscount,
  discount,
  vendor,
  isExpired,
  isStarted,
}) {
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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const statusMessage = inactiveMessage();
  const inactiveExpiredTextColor = inactiveOrExpired();

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
  // toggle if discount is active or not
  const toggleActive = (e) => {
    e.preventDefault();
    console.log("This is discount.id: ", discount.id);
    dispatch({
      type: "TOGGLE_ACTIVE_DISCOUNT",
      payload: {
        discountId: discount.id,
      },
    });
  };
  // cleans up the date to only display yyyy/mm/dd
  function formatDate(dateDirty) {
    let niceDate = new Date(dateDirty);
    return niceDate.toISOString().split("T")[0];
  }

  // this function will return the classnames
  // needed for displaying the current discount status
  function inactiveOrExpired() {
    if (discount.is_shown && isExpired() && isStarted()) {
      return `text-success fw-bold`;
    } else {
      return `text-danger fw-bold`;
    }
  }
  // This function returns the proper status message for a discount depending on its status
  function inactiveMessage() {
    if (discount.is_shown && (isExpired() || null) && (isStarted() || null)) {
      return `Active`;
    } else if (discount.is_shown && !isExpired()) {
      return `Expired`;
    } else if (!discount.is_shown) {
      return `Inactive`;
    } else if (discount.is_shown && !isStarted()) {
      return `Not Started`;
    }
  }
  // This function will toggle the edit modal off
  // and show the delete confirmation
  const hideEditShowDeleteConfirmation = (e) => {
    e.preventDefault();
    setShowEditDiscount(false);
    setShowDeleteConfirmation(true);
  };

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
          <Modal.Header className="bg-primary text-light">
            <Modal.Title className="text-light fw-bold">
              Edit Discount
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {vendor && (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h4 className="text-primary fw-bold mx-2">{vendor.name}</h4>
                <h6 className={inactiveExpiredTextColor}>
                  Status: {statusMessage}
                </h6>
              </div>
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
            <div className="w-100 d-flex justify-content-end align-items-center flex-wrap">
              <Button
                variant="danger"
                className="col"
                onClick={hideEditShowDeleteConfirmation}
              >
                Delete
              </Button>
              &nbsp;
              <Button
                variant="warning"
                className="col text-nowrap"
                onClick={toggleActive}
              >
                {discount.is_shown ? `Turn Off` : `Turn On`}
              </Button>
              &nbsp;
              <Button type="submit" className="col" variant="primary">
                Save
              </Button>
              &nbsp;
              <Button
                variant="outline-primary"
                className="col"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      <ConfirmDeleteModal
        parentModalToggleSetter={setShowEditDiscount}
        hideThisModalToggle={showDeleteConfirmation}
        hideThisModalToggleSetter={setShowDeleteConfirmation}
        deleteFunction={removeDiscount}
        deleteType={"discount"}
      />
    </>
  );
}

export default DiscountModal;
