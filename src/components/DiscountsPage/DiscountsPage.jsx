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

  // redux stores for managing search parameters
  const selectedCities = useSelector(
    (store) => store.filter.selectedCitiesReducer
  );
  const selectedCategories = useSelector(
    (store) => store.filter.selectedCategoriesReducer
  );
  // redux store containing all available member discounts
  const allMemberDiscounts = useSelector(
    (store) => store.discounts.memberDiscountsReducer
  );
  // redux store containing current filtered list of member discounts
  const filteredDiscounts = useSelector(
    (store) => store.filter.filteredDiscountsReducer
  );

  const [showFilterOffCanvas, setShowFilterOffCanvas] = useState(false);

  function filterDiscounts() {
    let discountList = [...allMemberDiscounts];
    console.log('in filter')


    // ~~~THIS IS A START TO USING INDEXOF TO FILTER DISCOUNT ARRAY
    // const categoryIds = selectedCategories.map((thisCat) => thisCat.id);
    // const cityNames = selectedCities.map((thisCity) => thisCity.city);
    // if(categoryIds.length !== 0 || cityNames.length !== 0){
    // discountList = discountList.filter((thisDiscount)=>{
    //   console.log('in filter', categoryIds.indexOf(thisDiscount.category_id))
    //   if(categoryIds.indexOf(thisDiscount.category_id) === -1){
    //     console.log('in cat indexOf, discount it', thisDiscount.category_id);
    //     return false;
    //   } else if(cityNames.indexOf(thisDiscount.city) === -1){
    //     console.log('in city indexOf, discount it', thisDiscount);
    //     return false;
    //   } else {
    //     return true;
    //   }
    // })}

    // for each selected category, filter out discounts that don't match
    for (let category of selectedCategories) {
      discountList = discountList.filter((discount) => {
        return discount.category_id === category.id;
      });
    }

    for (let city of selectedCities) {
      discountList = discountList.filter((discount) => {
        return discount.city === city.city;
      });
    }

    dispatch({ type: "SET_FILTERED_DISCOUNTS", payload: discountList });
  }

  useEffect(() => dispatch({ type: "GET_MEMBER_DISCOUNTS" }), []);
  useEffect(
    () => console.log("memberDiscounts are", allMemberDiscounts),
    [allMemberDiscounts]
  );
  // updated filtered discount array when changes made to filter
  useEffect(
    () => filterDiscounts(),
    [selectedCities, selectedCategories, allMemberDiscounts]
  );

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
          {selectedCities.length > 0 || selectedCategories.length > 0
            ? "Edit"
            : "Refine"}{" "}
          My Search
        </Button>
      </div>

      <Offcanvas
        show={showFilterOffCanvas}
        onHide={() => setShowFilterOffCanvas(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Narrow Your Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <DiscountFilterOffCanvas
            setShowFilterOffCanvas={setShowFilterOffCanvas}
          />
        </Offcanvas.Body>
      </Offcanvas>

      {filteredDiscounts.map((thisDiscount, index) => {
        return <DiscountCard key={index} thisDiscount={thisDiscount} />;
      })}
    </>
  );
}

export default DiscountsPage;
