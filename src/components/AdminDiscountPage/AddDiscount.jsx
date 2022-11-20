import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";
import UpdatedNavBar from "../Nav/Nav";

function AddDiscount() {
  //grab all categories
  const allCategories = useSelector((store) => store.categories);
  // grab all vendors
  const allVendors = useSelector((store) => store.vendors);

  const dispatch = useDispatch();
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [discountCode, setDiscountCode] = useState("N/A");
  const [category, setCategory] = useState("BaBeer");
  const [isShown, setIsShown] = useState("True");
  const [isRegional, setIsRegional] = useState("False");

  const addDiscount = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_DISCOUNT",
      payload: {
        description: description,
        start_date: startDate,
        expiration_date: expDate,
        discount_code: discountCode,
        category: category,
      },
    });
  };

  console.log('categories', allCategories)
  console.log('vendors', allVendors)

  return (
    <>
    <UpdatedNavBar />
    <div className="container text-center">
      <h2 className="text-primary"> Add Discount</h2>
      <form onSubmit={addDiscount}>
        <DropdownButton id="category-select-dropdown" title="Vendor">
          <Dropdown.ItemText>Select</Dropdown.ItemText>
          {allVendors.map((vendors, index) => {
            return (
              <Dropdown.Item as="button" key={index}>
                {vendors.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <FloatingLabel
          className="mb-1 text-primary"
          controlId="floatingFirstName"
          label="Description"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            autoFocus
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-1 text-primary"
          controlId="floatingFirstName"
          label="Start Date"
        >
          <Form.Control
            type="date"
            placeholder="name@example.com"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            autoFocus
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-1 text-primary"
          controlId="floatingFirstName"
          label="Expiration Date"
        >
          <Form.Control
            type="date"
            placeholder="name@example.com"
            value={expDate}
            onChange={(event) => setExpDate(event.target.value)}
            autoFocus
          />
        </FloatingLabel>
        <FloatingLabel
          className="mb-1 text-primary"
          controlId="floatingFirstName"
          label="Discount Code (If Applicable)"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            value={discountCode}
            onChange={(event) => setDiscountCode(event.target.value)}
            autoFocus
          />
        </FloatingLabel>
        <DropdownButton id="category-select-dropdown" title="Category">
          <Dropdown.ItemText>Select</Dropdown.ItemText>
          {allCategories.map((categories, index) => {
            return (
              <Dropdown.Item as="button" key={index}>
                {categories.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </form>
    </div>
    </>
  );
}

export default AddDiscount;
