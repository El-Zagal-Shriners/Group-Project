import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";


// components
import DiscountCard from "./DiscountCard";
import DiscountFilterOffCanvas from "./DiscountFilterOffCanvas";

function DiscountsPage() {
  const dispatch = useDispatch();

  // redux store of allDiscounts
  const allDiscounts = useSelector(
    (store) => store.discounts.discountsReducer
  );

  // redux stores for managing search parameters
  const selectedCities = useSelector(
    (store) => store.filter.selectedCitiesReducer
  );
  const selectedCategories = useSelector(
    (store) => store.filter.selectedCategoriesReducer
  );
  // redux store containing all discounts after filter is applied
  const filteredDiscounts = useSelector(
    (store) => store.filter.filteredDiscountsReducer
  )
  
  // state for managing opening and closing filter off canvas
  const [showFilterOffCanvas, setShowFilterOffCanvas] = useState(false);
  

  // this function will take this list of all discounts and filter it based on the 
  // user input from the discountFilterOffCanvas and company search bar
  function filterDiscounts() {
    
    //

  }




  useEffect(()=>dispatch({ type: "GET_DISCOUNTS"}),[]);
  useEffect(()=>console.log("allDiscounts is", allDiscounts), [allDiscounts]);


  return (
    <>
      <UpdatedNavBar />
      <div className="d-flex justify-content-center">
        
        <Button
          size="lg"
          variant="outline-primary"
          onClick={() => setShowFilterOffCanvas(true)}
          className="me-2 d-flex justify-content-center"
        >
          {(selectedCities.length>0 || selectedCategories.length >0) ? "Edit" : "Refine"} My Search
        </Button>
      </div>

      <Offcanvas show={showFilterOffCanvas} onHide={() => setShowFilterOffCanvas(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Narrow Your Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DiscountFilterOffCanvas
            setShowFilterOffCanvas={setShowFilterOffCanvas}
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
