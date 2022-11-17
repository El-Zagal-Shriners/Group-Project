import DiscountModal from "./DiscountModal";
import { useState } from "react";

function DiscountCard({ thisDiscount }) {
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  return (
    <>
      <div
        className="bg-secondary rounded m-1"
        onClick={() => setShowDiscountModal(true)}
      >
        <div className="p-3">
          <span className="bg-light m-1 rounded p-2 ">
            {thisDiscount.description}, {thisDiscount.vendor_name}
          </span>
          <span className="bg-light m-1 rounded p-2">
            {thisDiscount.category_name}
            {thisDiscount.city}
          </span>
        </div>
      </div>
      <DiscountModal
        thisDiscount={thisDiscount}
        showDiscountModal={showDiscountModal}
        setShowDiscountModal={setShowDiscountModal}
      />
    </>
  );
}

export default DiscountCard;
