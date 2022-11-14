import { useState } from "react";

// components
import DiscountCard from "./DiscountCard";
import DiscountFilter from "./DiscountFilter";

function DiscountsPage() {
  // store all discounts in list after <DiscountFilter/> is applied to allDiscounts;
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);

  return (
    <>
      <DiscountFilter setFilteredDiscounts={setFilteredDiscounts} />
      {filteredDiscounts.map((thisDiscount) => {
        return <DiscountCard thisDiscount={thisDiscount} />;
      })}
    </>
  );
}

export default DiscountsPage;
