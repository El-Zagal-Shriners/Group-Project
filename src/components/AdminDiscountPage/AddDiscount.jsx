import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";

function AddDiscount() {
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
  return(
    <div className="container text-center"> 
    <h2 className="text-primary"> Add Discount</h2> 
    <form onSubmit={addDiscount}>
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
            <FloatingLabel
        className="mb-1 text-primary"
        controlId="floatingFirstName"
        label="Category"
      >
        <Form.Control
                type="text"
                placeholder="name@example.com"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                autoFocus
              />
            </FloatingLabel>
    </form>
    </div>
  )
}

export default AddDiscount;
