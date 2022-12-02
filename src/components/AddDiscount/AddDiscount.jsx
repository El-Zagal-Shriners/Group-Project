import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";

function AddDiscountModal() {
  //grab all categories
  const allCategories = useSelector((store) => store.categories);
  // grab all vendors
  const allVendors = useSelector((store) => store.vendors);

  const dispatch = useDispatch();
  const history = useHistory();
  // local states
  const [show, setShow] = useState(false);
  const [vendorId, setVendorId] = useState(undefined);
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountSummary, setDiscountSummary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [discountUsage, setDiscountUsage] = useState("");
  const [categoryId, setCategoryId] = useState(undefined);
  const [isShown, setIsShown] = useState(true);
  const [isRegional, setIsRegional] = useState(false);
  const [vendorSelected, setVendorSelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [vendorNotSelected, setVendorNotSelected] = useState(false);
  const [categoryNotSelected, setCategoryNotSelected] = useState(false);
  const [submitCheck, setSubmitCheck] = useState(false);
  const [showInvalid, setShowInvalid] = useState(false);

  // function to close the add discount modal
  const handleClose = (e) => {
    e.preventDefault();
    resetInputs();
  };
  // toggle show local state to true
  // displays add discount modal
  const handleShow = () => setShow(true);

  // function that checks if vendor and category are selected
  // and discount summary input is valid, dispatch new discount 
  // object for INSERT to database
  const addDiscount = (event) => {
    event.preventDefault();
    if (vendorSelected && categorySelected && discountSummary.length < 16) {
      dispatch({
        type: "ADD_DISCOUNT",
        payload: {
          vendorId: vendorId,
          discountDescription: discountDescription,
          discountSummary: discountSummary,
          startDate: startDate,
          expDate: expDate,
          discountUsage: discountUsage,
          categoryId: categoryId,
          isShown: isShown,
          isRegional: isRegional,
        },
      });
      // Reset the form values.
      resetInputs();
    } else {
      // true if atleast one submit has occurred with invalid information
      setSubmitCheck(true);
      if (!categoryNotSelected) {
        // displays select category message if the user didn't select one before
        // trying to submit a new discount
        setCategoryNotSelected(true);
      }
      if (!vendorNotSelected) {
        // displays select vendor message if the user didn't select one before
        // trying to submit a new discount
        setVendorNotSelected(true);
      }
      if (discountSummary.length > 15) {
        // displays a message to indicate to the user that the
        // discount summary is too long
        setShowInvalid(true);
      }
    }
  };
  // This function will resest the form to default state
  const resetInputs = () => {
    setVendorId(1);
    setCategoryId(1);
    setDiscountDescription("");
    setDiscountSummary("");
    setStartDate("");
    setExpDate("");
    setDiscountUsage("N/A");
    setShow(false);
    setVendorSelected(false);
    setCategorySelected(false);
    setCategoryNotSelected(false);
    setVendorNotSelected(false);
    setSubmitCheck(false);
    setShowInvalid(false);
    setIsRegional(false);
  };
  // Grabs the current vendors and categories on page load
  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "GET_CATEGORIES" });
  }, []);

  // Function that sets the local states for the currently selected vendor
  const handleSelectVendor = (eventKey) => {
    setVendorId(eventKey);
    setVendorSelected(true);
    setVendorNotSelected(true);
  };
  // Function that sets the local states for the currently selected category
  const handleSelectCategory = (eventKey) => {
    setCategoryId(eventKey);
    setCategorySelected(true);
    setCategoryNotSelected(true);
  };
  // 
  useEffect(() => {
    // checks the discount summary input on the change
    // for a valid length
    // indicates to the user if the input string is too long
    if (discountSummary.length < 16) {
      setShowInvalid(false);
    } else {
      setShowInvalid(true);
    }
  }, [discountSummary]);

  return (
    <>
      {/* Add discount button that shows the modal*/}
      <Button className="col-5" variant="primary" onClick={handleShow}>
        Add Discount
      </Button>

      <Modal show={show}>
        <form onSubmit={addDiscount}>
          <Modal.Header className="bg-primary text-light">
            <Modal.Title className="text-light fw-bold">
              Add Discount
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-center p-1">
              {/* Display the selected vendor after a vendor has been selected */}
              {vendorSelected && (
                <div>
                  <h5 className="text-center w-100 mt-1">
                    Vendor:&nbsp;
                    <span className="text-primary fw-bold">
                      {
                        allVendors[
                          allVendors.findIndex(
                            (item) => Number(item.id) === Number(vendorId)
                          )
                        ]?.name
                      }
                    </span>
                  </h5>
                </div>
              )}
              {/* Display a message if the user did not select a vendor and tried submitting */}
              {!vendorSelected && submitCheck && <p>Please select a vendor!</p>}
              {/* Dropdown for selecting a vendor */}
              <Dropdown
                onSelect={(eventKey) => handleSelectVendor(eventKey)}
                className="mb-2"
              >
                <Dropdown.Toggle className="w-100">
                  Select Vendor
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-scroll">
                  {allVendors.map((vendor) => {
                    return (
                      <Dropdown.Item key={vendor.id} eventKey={vendor.id}>
                        {vendor.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* Input for discount summary (must be less than 16 characters) */}
              <FloatingLabel
                className="mb-1 text-primary"
                label="Discount Summary"
              >
                <Form.Control
                  type="text"
                  placeholder="Discount Summary"
                  required
                  value={discountSummary}
                  className="mx-0"
                  isInvalid={showInvalid ? true : false}
                  onChange={(e) => setDiscountSummary(e.target.value)}
                />
              </FloatingLabel>
              {/* Message if the summary is over 15 characters */}
              {showInvalid && (
                <p className="text-danger text-center">
                  Summary must be 15 or less characters
                </p>
              )}
              {/* Input for discount description */}
              <FloatingLabel
                className="mb-1 text-primary"
                label="Discount Description"
              >
                <Form.Control
                  type="text"
                  placeholder="Discount Description"
                  required
                  className="mx-0"
                  value={discountDescription}
                  onChange={(e) => setDiscountDescription(e.target.value)}
                />
              </FloatingLabel>
              {/* Input for start date */}
              <FloatingLabel className="mb-1 text-primary" label="Start Date">
                <Form.Control
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  className="mx-0"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FloatingLabel>
              {/* Input for expiration date */}
              <FloatingLabel
                className="mb-1 text-primary"
                label="Expiration Date"
              >
                <Form.Control
                  type="date"
                  placeholder="Expiration Date"
                  value={expDate}
                  className="mx-0"
                  onChange={(e) => setExpDate(e.target.value)}
                />
              </FloatingLabel>
              {/* Input for discount usage */}
              <FloatingLabel
                className="mb-1 text-primary"
                label="Discount Usage"
              >
                <Form.Control
                  type="text"
                  placeholder="Discount Usage"
                  required
                  value={discountUsage}
                  className="mx-0"
                  onChange={(e) => setDiscountUsage(e.target.value)}
                />
              </FloatingLabel>
              {/* Message if user didn't select a category */}
              {!categorySelected && submitCheck && (
                <p>Please select a category!</p>
              )}
              {/* Display the currently selected category */}
              {categorySelected && (
                <div>
                  <h5 className="text-center w-100 mt-1">
                    Category:&nbsp;
                    <span className="text-primary fw-bold">
                      {
                        allCategories[
                          allCategories.findIndex(
                            (item) => Number(item.id) === Number(categoryId)
                          )
                        ]?.name
                      }
                    </span>
                  </h5>
                </div>
              )}
              {/* Dropdown list to select a category */}
              <Dropdown onSelect={(eventKey) => handleSelectCategory(eventKey)}>
                <Dropdown.Toggle className="w-100">
                  Select Category
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-scroll">
                  {allCategories.map((category) => {
                    return (
                      <Dropdown.Item key={category.id} eventKey={category.id}>
                        {category.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* Buttons to select local or regional discount */}
              <ButtonGroup className="my-3">
                <ToggleButton
                  className="col-6"
                  type="radio"
                  variant="outline-primary"
                  name="radio"
                  checked={!isRegional}
                  onClick={() => setIsRegional(false)}
                >
                  This Location
                </ToggleButton>
                <ToggleButton
                  className="col-6"
                  type="radio"
                  variant="outline-primary"
                  name="radio"
                  checked={isRegional}
                  onClick={() => setIsRegional(true)}
                >
                  Regional
                </ToggleButton>
              </ButtonGroup>
              {/* Conditional message if the discount is marked regional */}
              {isRegional ? (
                <small className="text-muted text-center mb-3">
                  Note: Regional discounts do not apply to specific vendor
                  location, but to multiple locations of the same vendor. Ensure
                  that you provide sufficient detail in your discount
                  description about where members can use this discount (E.G.
                  use at all Restaurant-X locations across North Dakota)
                </small>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* modal buttons to submit or cancel form */}
            <Button variant="primary" type="submit">
              Add Discount
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

export default AddDiscountModal;
