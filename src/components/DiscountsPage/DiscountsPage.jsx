import { useState } from "react";
import { useSelector } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";


// components
import DiscountCard from "./DiscountCard";
import DiscountFilter from "./DiscountFilter";

function DiscountsPage() {
  // store all discounts in list after <DiscountFilter/> is applied to allDiscounts;
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);

  // redux stores for managing search parameters
  const selectedCities = useSelector(
    (store) => store.filter.selectedCitiesReducer
  );
  const selectedCategories = useSelector(
    (store) => store.filter.selectedCategoriesReducer
  );

  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <UpdatedNavBar />
      <div className="d-flex justify-content-center">
        
        <Button
          size="lg"
          variant="outline-primary"
          onClick={() => setShowFilter(true)}
          className="me-2 d-flex justify-content-center"
        >
          {(selectedCities.length>0 || selectedCategories.length >0) ? "Edit" : "Refine"} My Search
        </Button>
      </div>

      <Offcanvas show={showFilter} onHide={() => setShowFilter(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Narrow Your Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DiscountFilter
            setFilteredDiscounts={setFilteredDiscounts}
            setShowFilter={setShowFilter}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {filteredDiscounts.map((thisDiscount) => {
        return <DiscountCard thisDiscount={thisDiscount} />;
      })}
    </>
  );
}

export default DiscountsPage;
