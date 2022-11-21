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
              <div className="d-flex flex-column justify-content-center align-items-center fill-container">
                <IconContext.Provider value={{ size: "2em" }}>
                  {allIconComponents[thisDiscount.icon_class]}
                </IconContext.Provider>
                <div>{thisDiscount.category_name}</div>
              </div>
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-8">
                  <div className="px-1 py-2 bg-light rounded d-flex justify-content-start align-items-center">
                    <div className="mx-1">
                      <div className="text-start"><h5>{thisDiscount.vendor_name}</h5></div>
                      <div className="discount-address ms-2 text-start text-muted fw-light"><small>{thisDiscount.address}, {thisDiscount.city}</small></div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 bg-light rounded d-flex justify-content-center align-items-center fill-container">
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
