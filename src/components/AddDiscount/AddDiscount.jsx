import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton, ButtonGroup } from "react-bootstrap";
import UpdatedNavBar from "../Nav/Nav";
import ToggleButton from "react-bootstrap/ToggleButton";

function AddDiscountModal() {
  //grab all categories
  const allCategories = useSelector((store) => store.categories);
  // grab all vendors
  const allVendors = useSelector((store) => store.vendors);

  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleClose = (e) => {
    e.preventDefault();
    resestInputs();
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
      resestInputs();
      // history.push("/admindiscounts");
    } else {
      setSubmitCheck(true);
      if (!categoryNotSelected) {
        setCategoryNotSelected(true);
      }
      if (!vendorNotSelected) {
        setVendorNotSelected(true);
      }
      if (discountSummary.length > 15) {
        setShowInvalid(true);
      }
    }
  };
  // This function will resest the form
  const resestInputs = () => {
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

  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "GET_CATEGORIES" });
  }, []);

  const handleSelectVendor = (eventKey) => {
    setVendorId(eventKey);
    setVendorSelected(true);
    setVendorNotSelected(true);
  };

  const handleSelectCategory = (eventKey) => {
    setCategoryId(eventKey);
    setCategorySelected(true);
    setCategoryNotSelected(true);
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
              {!vendorSelected && submitCheck && <p>Please select a vendor!</p>}
              <Dropdown onSelect={(eventKey) => handleSelectVendor(eventKey)}>
                <DropdownButton
                  id="category-select-dropdown"
                  title="Vendor"
                  as={ButtonGroup}
                  className="w-100 mb-2"
                >
                  {allVendors.map((vendor) => {
                    return (
                      <Dropdown.Item key={vendor.id} eventKey={vendor.id}>
                        {vendor.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Dropdown>
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
              {showInvalid && (
                <p className="text-danger text-center">
                  Summary must be 15 or less characters
                </p>
              )}
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
              <FloatingLabel className="mb-1 text-primary" label="Start Date">
                <Form.Control
                  type="date"
                  placeholder="Start Date"
                  value={startDate}
                  className="mx-0"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FloatingLabel>
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
              {!categorySelected && submitCheck && (
                <p>Please select a category!</p>
              )}
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
              <Dropdown onSelect={(eventKey) => handleSelectCategory(eventKey)}>
                <DropdownButton
                  id="category-select-dropdown"
                  title="Category"
                  as={ButtonGroup}
                  className="w-100"
                >
                  {allCategories.map((category) => {
                    return (
                      <Dropdown.Item key={category.id} eventKey={category.id}>
                        {category.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Dropdown>
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
              {isRegional ? (
                <small className="text-muted text-center mb-3">
                  Note: Regional discounts do not apply to specific vendor
                  location, but to multiple locations of the same vendor. Ensure
                  that you provide sufficient detail in your discount
                  description about where members can use this discount (E.G.
                  use at all Restaurant-X locations across North Dakota)
                </small>
              ) : null}
              {/* {!categorySelected && submitCheck && (
                <p>Please select a category!</p>
              )}
              <Dropdown onSelect={(eventKey) => handleSelectCategory(eventKey)}>
                <DropdownButton
                  id="category-select-dropdown"
                  title="Category"
                  as={ButtonGroup}
                  className="w-100"
                >
                  {allCategories.map((category) => {
                    return (
                      <Dropdown.Item key={category.id} eventKey={category.id}>
                        {category.name}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </Dropdown> */}
            </div>
          </Modal.Body>
          <Modal.Footer>
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
