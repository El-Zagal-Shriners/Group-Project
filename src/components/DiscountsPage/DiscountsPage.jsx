import { useState } from "react";
import UpdatedNavBar from "../Nav/Nav";

// components
import DiscountCard from "./DiscountCard";
import DiscountFilter from "./DiscountFilter";

function DiscountsPage() {
  // store all discounts in list after <DiscountFilter/> is applied to allDiscounts;
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);

  return (
    <>
      <UpdatedNavBar />
      <DiscountFilter setFilteredDiscounts={setFilteredDiscounts} />
      {filteredDiscounts.map((thisDiscount) => {
        return <DiscountCard thisDiscount={thisDiscount} />;
      })}
    </>
  );
}

export default DiscountsPage;
