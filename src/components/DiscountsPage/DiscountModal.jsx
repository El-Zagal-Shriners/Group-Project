import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import { IconContext } from "react-icons";
import Container from "react-bootstrap/Container";
import axios from "axios";

function DiscountModal({
  thisDiscount,
  showDiscountModal,
  setShowDiscountModal,
}) {
  // if the user has already clicked on "show discount code" button while
  // in the discount page => set to true,
  // this prevents a second click from being sent to the discount tracker
  const [alreadyTracked, setAlreadyTracked] = useState(false);

  function handleShowCode() {
    if (alreadyTracked === false) {
      const discountDate = new Date().toUTCString();

      axios({
          method: "POST",
          url: `api/discounts/tracker/${thisDiscount.discount_id}`,
          data: {discountDate}
        })
        .then(() => {
          console.log("POST to tracker successful");
        })
        .catch((err) => console.log("Error with posting to tracker", err));
    }
    setAlreadyTracked(true);
  }
  return (
    <>
      <Modal
        show={showDiscountModal}
        onHide={() => setShowDiscountModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>This Discount</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="bg-primary text-light rounded">
            <div className="mb-3 text-center">
              <h1>{thisDiscount.vendor_name}</h1>
            </div>

            <div className="row">
              <div className="col-5">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="text-center">
                    <IconContext.Provider value={{ size: "2em" }}>
                      {allIconComponents[thisDiscount.icon_class]}
                    </IconContext.Provider>
                    <div>{thisDiscount.category_name}</div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="d-flex justify-content-center flex-column">
                  {thisDiscount.address}
                  <br />
                  <div>
                    {thisDiscount.city},<span> </span>
                    {thisDiscount.state_code}
                    <span> </span>
                    {thisDiscount.zip}
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="m-3 text-center">
              <h3>{thisDiscount.description}</h3>
            </div>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => handleShowCode()}>
                  <span className="text-center">
                    Click To Show Discount Code
                  </span>
                </Accordion.Header>
                <Accordion.Body>{thisDiscount.discount_code}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShowDiscountModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiscountModal;
