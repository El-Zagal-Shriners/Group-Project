import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router-dom";

function AddVendorModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [website, setWebsite] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  return (
    <>
      <Button className="col-5" variant="primary" onClick={handleShow}>
        Add Vendor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Add Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-1 text-primary" label="Business Name">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-1 text-primary" label="Address">
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-1 text-primary" label="City">
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-1 text-primary" label="State Code">
            <Form.Control
              type="text"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-1 text-primary" label="Zip">
            <Form.Control
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </FloatingLabel>
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
          <Button variant="primary" onClick={addVendor}>
            Add Vendor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddVendorModal;
