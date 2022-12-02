import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

function EditVendorModal(props) {
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
  // vendor edit object
  const vendorObj = {
    vendorId: Number(props.currentSelected),
    name: vendorName,
    address: vendorAddress,
    city: vendorCity,
    stateCode: vendorState,
    zip: vendorZip,
    website: vendorWebsite,
  };
  // send edit vendor object
  const editVendor = () => {
    dispatch({
      type: "EDIT_VENDOR",
      payload: vendorObj,
    });
    // reset edit vendor modal control state
    props.setShowEditVendor(false);
  };
  // render modal with inputs to edit a current vendor
  return (
    <>
      <Modal show={props.showEditVendor} onHide={(()=>props.setShowEditVendor(false))}>
        <Modal.Header className="bg-primary text-light">
          <Modal.Title className="text-light fw-bold"> Edit Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Business name input */}
          <FloatingLabel
            className="text-primary"
            label="Business Name (Required)"
          >
            <Form.Control
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </FloatingLabel>
          {/* Address input */}
          <FloatingLabel className="text-primary" label="Address (Required)">
            <Form.Control
              value={vendorAddress}
              onChange={(e) => setVendorAddress(e.target.value)}
            />
          </FloatingLabel>
          {/* City input */}
          <FloatingLabel className="text-primary" label="City (Required)">
            <Form.Control
              value={vendorCity}
              onChange={(e) => setVendorCity(e.target.value)}
            />
          </FloatingLabel>
          {/* State input */}
          <FloatingLabel className="text-primary" label="State (Required)">
            <Form.Control
              value={vendorState}
              onChange={(e) => setVendorState(e.target.value)}
            />
          </FloatingLabel>
          {/* Zip input */}
          <FloatingLabel className="text-primary" label="Zip Code">
            <Form.Control
              value={vendorZip}
              onChange={(e) => setVendorZip(e.target.value)}
            />
          </FloatingLabel>
          {/* Website input */}
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
          {/* Modal buttons to sumbit the edit vendor form or cancel */}
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
