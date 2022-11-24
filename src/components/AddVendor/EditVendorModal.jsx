import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

function EditVendorModal(vendorMap) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [vendorName, setVendorName] = useState(vendorMap.name);
  const [vendorAddress, setVendorAddress] = useState(vendorMap.address);
  const [vendorCity, setVendorCity] = useState(vendorMap.city);
  const [vendorState, setVendorState] = useState(vendorMap.state_code);
  const [vendorZip, setVendorZip] = useState(vendorMap.zip);
  const [vendorWebsite, setVendorWebsite] = useState(
    vendorMap.website_url
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const vendorObj = {
    vendorId: vendorMap.id,
    vendorName,
    vendorAddress,
    vendorCity,
    vendorState,
    vendorZip,
    vendorWebsite,
  }

  const editVendor = () => {
    dispatch({
        type: "EDIT_VENDOR",
        payload: vendorObj,
    })
    setShow(false);
  }

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Edit
    </Button>
    </>
  
  );
}

export default EditVendorModal;
