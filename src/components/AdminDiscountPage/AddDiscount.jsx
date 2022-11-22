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

function AddDiscountModal() {
  //grab all categories
  const allCategories = useSelector((store) => store.categories);
  // grab all vendors
  const allVendors = useSelector((store) => store.vendors);

  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [vendorId, setVendorId] = useState(1);
  const [discountDescription, setDiscountDescription] = useState("");
  const [discountSummary, setDiscountSummary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [discountUsage, setDiscountUsage] = useState("N/A");
  const [categoryId, setCategoryId] = useState(1);
  const [isShown, setIsShown] = useState("True");
  const [isRegional, setIsRegional] = useState("False");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addDiscount = (event) => {
    // console.log("In addDiscount() vendorId;", vendorId, "categoryId:", categoryId);
    event.preventDefault();

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
    setVendorId(1);
    setCategoryId(1);
    setDiscountDescription("");
    setDiscountSummary("");
    setStartDate("");
    setExpDate("");
    setDiscountUsage("N/A");
    setShow(false);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "GET_CATEGORIES" });
    // console.log("categories", allCategories);
    // console.log("vendors", allVendors);
  }, []);

  return (
<>
      <Button variant="primary" onClick={handleShow}>
        Add Discount
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title className="text-primary">Add Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Dropdown onSelect={(eventKey) => setVendorId(eventKey)}>
          <DropdownButton
            id="category-select-dropdown"
            title="Vendor"
            as={ButtonGroup}
          >
            {allVendors.map((vendor) => {
              return (
                <Dropdown.Item eventKey={vendor.id}>
                  {vendor.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Dropdown>
          <FloatingLabel
            className="mb-1 text-primary"
            label="Discount Description"
          >
            <Form.Control
              value={discountDescription}
              onChange={(e) => setDiscountDescription(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            label="Discount Summary"
          >
            <Form.Control
              value={discountSummary}
              onChange={(e) => setDiscountSummary(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            label="Start Date"
          >
            <Form.Control
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            label="Expiration Date"
          >
            <Form.Control
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            label="Discount Usage (If Applicable)"
          >
            <Form.Control
              value={discountUsage}
              onChange={(e) => setDiscountUsage(e.target.value)}
            />
          </FloatingLabel>
          <Dropdown onSelect={(eventKey) => setCategoryId(eventKey)}>
            <DropdownButton
              id="category-select-dropdown"
              title="Category"
              as={ButtonGroup}
            >
              {allCategories.map((category) => {
                return (
                  <Dropdown.Item eventKey={category.id}>
                    {category.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addDiscount}>
            Add Discount
          </Button>
        </Modal.Footer>
        </Modal>
        </>
  );
}

export default AddDiscountModal;
