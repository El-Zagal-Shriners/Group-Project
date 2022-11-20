import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";

function AddVendor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [website, setWebsite] = useState("");

  const addVendor = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_VENDOR",
      payload: {
        name: name,
        address: address,
        city: city,
        stateCode: stateCode,
        zip: zip,
        website: website,
      },
    });
    history.push("/admin");
  };
  return (
    <>
      <UpdatedNavBar />
      <div className="container text-center">
        <h2 className="text-primary">Add Vendor Form</h2>
        <form onSubmit={addVendor}>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="Business Name"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="Address"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="City"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="State Code"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={stateCode}
              onChange={(event) => setStateCode(event.target.value)}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="Zip"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              autoFocus
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-1 text-primary"
            controlId="floatingFirstName"
            label="Website (If Applicable)"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              autoFocus
            />
          </FloatingLabel>
          <button type="submit" className="btn btn-primary">
            Add Vendor
          </button>
        </form>
      </div>
    </>
  );
}

export default AddVendor;
