import DiscountModal from "./DiscountModal";
import "./DiscountCard.css";
import { IconContext } from "react-icons";
import { useState } from "react";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import Container from "react-bootstrap/Container";

function DiscountCard({ thisDiscount }) {
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  return (
    <>
      <Container
        className="hover-shadow bg-muted-primary rounded my-2 p-1 d-flex flex-row justify-content-center align-items-center "
        onClick={() => setShowDiscountModal(true)}
      >
        <div className="row fill-container">
            <div className="col-2">
              <div className="d-flex justify-content-center align-items-center fill-container">
                <IconContext.Provider value={{ size: "2em" }}>
                  {allIconComponents[thisDiscount.icon_class]}
                </IconContext.Provider>
              </div>
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-8">
                  <div className="bg-light rounded d-flex justify-content-start align-items-center">
                    <div className="ms-1">
                      <div className="text-start fw-bold">{thisDiscount.vendor_name}</div>
                      <div className="text-start text-muted fw-light">{thisDiscount.address}, {thisDiscount.city}</div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="bg-light rounded d-flex justify-content-center align-items-center fill-container">
                    <div className="discount-text">{thisDiscount.description}</div>
                  </div>
                </div> 
              </div>  
            </div> 
        </div>
      </Container>
      <DiscountModal
          thisDiscount={thisDiscount}
          showDiscountModal={showDiscountModal}
          setShowDiscountModal={setShowDiscountModal}
        />
    </>
  );
}

export default DiscountCard;
