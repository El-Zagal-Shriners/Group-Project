import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function AddVendorModal() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [website, setWebsite] = useState("");
  // sets modal control state to false, hides modal
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  }
  // sets modal state to true, shows the modal
  const handleShow = () => setShow(true);
  // submits the new vendor information to the database
  // sets the modal control state to false - hides modal
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
    setShow(false);
  };
  // renders modal for inputting the required information to add a new
  // vendor to the system
  return (
    <>
      <Button className="col-5" variant="primary" onClick={handleShow}>
        Add Vendor
      </Button>

      <Modal show={show}>
        <form onSubmit={addVendor} >
        <Modal.Header className="bg-primary text-light">
          <Modal.Title className="text-light fw-bold">Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Business name input */}
          <FloatingLabel className="mb-1 text-primary" label="Business Name">
            <Form.Control
              type="text"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          {/* Address input */}
          <FloatingLabel className="mb-1 text-primary" label="Address">
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>
          {/* City input */}
          <FloatingLabel className="mb-1 text-primary" label="City">
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FloatingLabel>
          {/* State code input */}
          <FloatingLabel className="mb-1 text-primary" label="State Code">
            <Form.Control
              type="text"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            />
          </FloatingLabel>
          {/* zip code input */}
          <FloatingLabel className="mb-1 text-primary" label="Zip">
            <Form.Control
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </FloatingLabel>
          {/* website url input */}
          <FloatingLabel
            className="mb-1 text-primary"
            label="Website (If Applicable)"
          >
            <Form.Control
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          {/* modal buttons to submit vendor information or cancel */}
          <Button variant="primary" type="submit">
            Add Vendor
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

export default AddVendorModal;
