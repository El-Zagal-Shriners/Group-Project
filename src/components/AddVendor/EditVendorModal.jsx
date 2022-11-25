import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditVendorModal(props) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // const vendors = useSelector((store) => store.vendors);
  // const vendor = vendors.find((vend) => vend.id === Number(vendorid));

console.log("props.allVendors", props.currentVendor);

const getVendor = () => {
  console.log('In getVendor');
  // console.log('This is currentVendor: ', allVendors[allVendors.findIndex((item)=>Number(item.id)===Number(currentSelected))]);
  return(
    props.allVendors.findIndex(
      (item) => Number(item.id) === Number(props.currentSelected)
    ))
}

  const [vendorName, setVendorName] = useState(props.allVendors[getVendor()].name);
  const [vendorAddress, setVendorAddress] = useState(props.allVendors[getVendor()].address);
  const [vendorCity, setVendorCity] = useState(props.allVendors[getVendor()].city);
  const [vendorState, setVendorState] = useState(props.allVendors[getVendor()].state_code);
  const [vendorZip, setVendorZip] = useState(props.allVendors[getVendor()].zip);
  const [vendorWebsite, setVendorWebsite] = useState(props.allVendors[getVendor()].website_url);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const vendorObj = {
    vendorId: Number(props.currentSelected),
    name: vendorName,
    address: vendorAddress,
    city: vendorCity,
    stateCode: vendorState,
    zip: vendorZip,
    website: vendorWebsite,
  };

  const editVendor = () => {
    dispatch({
      type: "EDIT_VENDOR",
      payload: vendorObj,
    });
    setShow(false);
  };

  // useEffect(() => {
  //   {
  //     props.allVendors[
  //       props.allVendors.findIndex(
  //         (item) => Number(item.id) === Number(props.currentSelected)
  //       )
  //     ]?.name
  //   }

  //   // setCurrentVendor=
  // }, []);

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
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditVendorModal;
