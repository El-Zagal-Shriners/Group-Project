import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditVendorModal(vendorMap) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  let params = useParams();
  let vendorid = params.vendorid;

  const vendors = useSelector((store) => store.vendors);
  const vendor = vendors.find((vend) => vend.id === Number(vendorid));

  const [vendorName, setVendorName] = useState(vendorMap.name);
  const [vendorAddress, setVendorAddress] = useState(vendorMap.address);
  const [vendorCity, setVendorCity] = useState(vendorMap.city);
  const [vendorState, setVendorState] = useState(vendorMap.state_code);
  const [vendorZip, setVendorZip] = useState(vendorMap.zip);
  const [vendorWebsite, setVendorWebsite] = useState(vendorMap.website_url);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const vendorObj = {
    vendorid: Number(vendorid),
    vendorName,
    vendorAddress,
    vendorCity,
    vendorState,
    vendorZip,
    vendorWebsite,
  };

  const editVendor = () => {
    dispatch({
      type: "EDIT_VENDOR",
      payload: vendorObj,
    });
    setShow(false);
  };

  const removeVendor = (vendorId) => {
    dispatch({
      type: "REMOVE_VENDOR",
      payload: vendorId,
    });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-primary"> Edit Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            className="text-primary"
            label="Business Name (Required)"
          >
            <Form.Control
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="Address (Required)">
            <Form.Control
              value={vendorAddress}
              onChange={(e) => setVendorAddress(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="City (Required)">
            <Form.Control
              value={vendorCity}
              onChange={(e) => setVendorCity(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="State (Required)">
            <Form.Control
              value={vendorState}
              onChange={(e) => setVendorState(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel className="text-primary" label="Zip Code">
            <Form.Control
              value={vendorZip}
              onChange={(e) => setVendorZip(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            className="text-primary"
            label="Website (If Applicable)"
          >
            <Form.Control
              value={vendorWebsite}
              onChange={(e) => setVendorWebsite(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editVendor}>
            Save Changes
          </Button>
          <Button variant="warning" onClick={removeVendor}>
            Delete Vendor
          </Button>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditVendorModal;
