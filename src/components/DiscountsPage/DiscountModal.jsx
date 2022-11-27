import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import { IconContext } from "react-icons";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";

function DiscountModal({
  thisDiscount,
  showDiscountModal,
  setShowDiscountModal,
}) {
  // if the user has already clicked on "show discount code" button while
  // in the discount page => set to true,
  // this prevents a second click from being sent to the discount tracker
  const [alreadyTracked, setAlreadyTracked] = useState(false);
  const dispatch = useDispatch();

  function handleShowCode() {
    if (alreadyTracked === false) {
      const discountDate = new Date().toUTCString();
      dispatch({
        type: "ADD_TO_DISCOUNT_TRACKER",
        payload: { discountDate, discountId: thisDiscount.discount_id },
      });
      setAlreadyTracked(true);
    }
  }

  // Begin function to display readable date format
  function displayCorrectedDate(date) {
    if (!date) return "No expiration";

    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);

    return `${month}/${day}/${year}`;
  } // End displayCorrectedDate

  return (
    <>
      <Modal
        show={showDiscountModal}
        onHide={() => setShowDiscountModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
          <Container className="bg-primary text-light rounded">
            <div className="mb-3 text-center">
              <h1 className="fw-bold">{thisDiscount.vendor_name}</h1>
            </div>

            <div className="row bg-light text-primary rounded-3 py-2 mx-2">
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
            <div className="m-3 text-center bg-warning text-black rounded-3 p-3">
              <h2>{thisDiscount.discount_summary}</h2>
              <hr />
              <h6>{thisDiscount.discount_description}</h6>
              {thisDiscount.expiration_date && (
                <h5 className="fst-italic">
                  {"Expires: " +
                    displayCorrectedDate(thisDiscount.expiration_date)}
                </h5>
              )}
            </div>

            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => handleShowCode()}>
                  <span className="text-center">
                    Click To Show Discount Instructions
                  </span>
                </Accordion.Header>
                <Accordion.Body className="text-center fw-bold text-primary">
                  {thisDiscount.discount_usage}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="outline-primary"
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
