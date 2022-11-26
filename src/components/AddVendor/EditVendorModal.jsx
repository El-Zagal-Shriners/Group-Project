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
  // const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const getVendor = () => {
    return props.allVendors.findIndex(
      (item) => Number(item.id) === Number(props.currentSelected)
    );
  };

  const [vendorName, setVendorName] = useState(
    props.allVendors[getVendor()].name
  );
  const [vendorAddress, setVendorAddress] = useState(
    props.allVendors[getVendor()].address
  );
  const [vendorCity, setVendorCity] = useState(
    props.allVendors[getVendor()].city
  );
  const [vendorState, setVendorState] = useState(
    props.allVendors[getVendor()].state_code
  );
  const [vendorZip, setVendorZip] = useState(props.allVendors[getVendor()].zip);
  const [vendorWebsite, setVendorWebsite] = useState(
    props.allVendors[getVendor()].website_url===null?"":props.allVendors[getVendor()].website_url
  );

  // const handleCloseEditVendor = () => setShow(false);
  // const handleShowEditVendor = () => setShow(true);

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
    props.setShowEditVendor(false);
  };

  return (
    <>
      {/* <Button variant="primary" className="mb-2 col-6" onClick={handleShow}>
        Edit
      </Button> */}
      <Modal show={props.showEditVendor} onHide={(()=>props.setShowEditVendor(false))}>
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
          <Button variant="outline-primary" onClick={()=>props.setShowEditVendor()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditVendorModal;
