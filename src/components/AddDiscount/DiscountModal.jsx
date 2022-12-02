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
  // dispath edit discount object if the edits are valid
  const editDiscount = (e) => {
    e.preventDefault();
    // checks for valid discount summary length (less than 16 characters)
    if (discountSummary.length < 16) {
      dispatch({
        type: "EDIT_DISCOUNT",
        payload: discountObj,
      });
      // reset local states
      setShowEditDiscount(false);
      setShowInvalid(false);
    } else {
      // show discount summary invalid if length to long
      setShowInvalid(true);
    }
  };
  // remove discount by discount id
  const removeDiscount = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_DISCOUNT",
      payload: discount.id,
    });
    setShowEditDiscount(false);
  };
  // toggle if discount is active or not by discount id
  const toggleActive = (e) => {
    e.preventDefault();
    dispatch({
      type: "TOGGLE_ACTIVE_DISCOUNT",
      payload: {
        discountId: discount.id,
      },
    });
  };
  // cleans up the date to only display yyyy/mm/dd
  function formatDate(dateDirty) {
    // holds the new date formatted to YYYY/MM/DD
    let niceDate = new Date(dateDirty);
    // returns only the data portion of the new date
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
    // sets the discount summary input to show as invalid if
    // the string is more than 16 characters
    if (discountSummary.length < 16) {
      setShowInvalid(false);
      return;
    } else {
      setShowInvalid(true);
    }
  }, [discountSummary]);
  // renders a modal to edit a selected discounts information
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
                <Button
                  variant={`${discount.is_shown ? "warning" : "success"}`}
                  className="border border-1 border-primary text-primary"
                  onClick={toggleActive}
                >
                  {discount.is_shown ? `Deactivate` : `Activate`}
                </Button>
              </div>
            )}
            {/* Input for discount summary - Max length is 15 characters */}
            <FloatingLabel className="text-primary" label="Summary">
              <Form.Control
                type="text"
                required
                value={discountSummary}
                isInvalid={showInvalid ? true : false}
                onChange={(e) => setDiscountSummary(e.target.value)}
              />
            </FloatingLabel>
            {/* message to indicate discount summary must be under 16 characters */}
            {showInvalid && <p>Summary must 15 or less characters</p>}
            {/* Input for the discount description */}
            <FloatingLabel className="text-primary" label="Description">
              <Form.Control
                type="text"
                required
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
              />
            </FloatingLabel>
            {/* Input for the Start date */}
            <FloatingLabel className="text-primary" label="Start Date">
              <Form.Control
                value={startDate}
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FloatingLabel>
            {/* Input for the expiration date */}
            <FloatingLabel className="text-primary" label="Expiration Date">
              <Form.Control
                value={expDate}
                type="date"
                onChange={(e) => setExpDate(e.target.value)}
              />
            </FloatingLabel>
            {/* Input for the discount usage (how to use the discount - code, show member id, etc) */}
            <FloatingLabel className="text-primary" label="Discount Usage">
              <Form.Control
                type="text"
                required
                value={discountUsage}
                onChange={(e) => setDiscountUsage(e.target.value)}
              />
            </FloatingLabel>
            {/* Conditionally display if discount is regional or not */}
            {discount.is_regional ? (
              <div className="text-center text-muted">
                This is a Regional Discount
              </div>
            ) : (
              <div className="text-center text-muted">
                This Discount Is Specific to One Vendor Location
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* Modal buttons to delete, submit changes or cancel edit on discount */}
            <div className="w-100 d-flex justify-content-end align-items-center flex-wrap">
              <Button
                variant="primary"
                className="col"
                onClick={hideEditShowDeleteConfirmation}
              >
                Delete
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
      {/* Renders a confirm delete modal with appropriate propss */}
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
