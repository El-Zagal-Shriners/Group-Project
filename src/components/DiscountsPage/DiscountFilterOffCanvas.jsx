import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";

import FilterFeedback from "./FilterFeedback";

// react boostrap components
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "react-bootstrap";

// react icons object imported from module
import { allIconComponents } from "../../allIconComponents/allIconComponents";

function DiscountFilterOffCanvas({
  showFilterOffCanvas,
  setShowFilterOffCanvas,
}) {
  const dispatch = useDispatch();

  // selects array of objects from discounts reducer with all available discounts
  const allDiscounts = useSelector((store) => store.discounts.discountsReducer);

  // selects all cities
  const allCities = useSelector((store) => store.cities.allCitiesReducer);

  // select all categories
  const allCategories = useSelector((store) => store.categories);

  // select all close cities
  // const closeCities = useSelector(store => store.cities.closeCitiesReducer);

  // redux stores for managing search parameters
  const selectedCities = useSelector(
    (store) => store.filter.selectedCitiesReducer
  );
  const selectedCategories = useSelector(
    (store) => store.filter.selectedCategoriesReducer
  );

  function handleCitySelection(thisCity, cityIsSelected) {
    // if city is already selected, remove it from the selectedCities array
    // else (city not yet selected), add it to the selected Cities array
    if (cityIsSelected) {
      console.log("in handleCitySelection, deselecting city", updatedCitiesArr);
      const updatedCitiesArr = removeObjectFromArray(thisCity, selectedCities);
      dispatch({ type: "SET_SELECTED_CITIES", payload: updatedCitiesArr });
    } else {
      // if thisCity is already in selectedCities arrray, don't add it again (return)
      // else add thisCity to selectedCities array
      if (selectedCities.includes(thisCity)) {
        console.log("city is already in array, dont add again");
        return;
      } else {
        console.log("adding this city to array");
        const updatedCitiesArr = [...selectedCities];
        updatedCitiesArr.push(thisCity);
        dispatch({ type: "SET_SELECTED_CITIES", payload: updatedCitiesArr });
      }
    }
  }

  // takes a category object
  function handleCategorySelection(thisCat, catIsSelected) {
    // if thisCat is already in selectedCategories arrray, don't add it again (return)
    // else add thisC to selectedCategories array
    if (selectedCategories.some((catObj) => thisCat.id === catObj.id)) {
      console.log("cat is already in array, dont add again");
      return;
    } else {
      console.log("adding this cat to array");
      const updatedCategoriesArr = [...selectedCategories];
      updatedCategoriesArr.push(thisCat);
      dispatch({
        type: "SET_SELECTED_CATEGORIES",
        payload: updatedCategoriesArr,
      });
    }
  }

  // this function removes an object from an array that has the
  // same id as the objectToRemove parameter
  function removeObjectFromArray(objectToRemove, array) {
    console.log("inRemoveItemFromArray", array, objectToRemove);
    let filteredArr = array.filter((thisItem) => {
      return thisItem.id !== objectToRemove.id;
    });
    console.log("inRemoveItemFromArray, filtered array is", filteredArr);

    return filteredArr;
  }

  // this function takes an array of city objects and returns
  // a new array with the first three objects only
  function closestThreeCities() {
    const firstThreeCities = [];
    for (let i = 0; i <= 2; i++) {
      firstThreeCities.push(allCities[i]);
    }
    return firstThreeCities;
  }

  useEffect(() => {
    dispatch({ type: "GET_CATEGORIES" });
    // dispatch({ type: "GET_ALL_CITIES" });
    // dispatch({ type: "GET_CLOSE_CITIES" });
    dispatch({ type: "GET_DISCOUNTS" });
  }, []);

  // store state in redux, so user can leave and return without re-inputting
  useEffect(() => {
    dispatch({
      type: "SET_FILTER_PARAMS",
      payload: {
        selectedCities,
        selectedCategories,
      },
    });
  }, [selectedCities, selectedCategories]);

  return (
    <Offcanvas
      show={showFilterOffCanvas}
      onHide={() => setShowFilterOffCanvas(false)}
      placement="start"
      name="start"
    >
      <Container className="bg-light fill-container">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Refine Your Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Select a Discount Category  */}
          <div className="m-1 p-1">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label htmlFor="category-select-dropdown" className="mx-1">
                I'm Looking For <br />
                (Select Multiple)
              </label>
              <DropdownButton id="category-select-dropdown" title="Select">
                <Dropdown.ItemText>Select</Dropdown.ItemText>
                {allCategories.map((thisCat, index) => {
                  return (
                    <Dropdown.Item
                      as="button"
                      key={index}
                      onClick={() => handleCategorySelection(thisCat, false)}
                    >
                      {thisCat.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>
          </div>

          <div className="m-2 d-flex justify-content-center m-1">IN</div>

          {/* Choose City From Dropdown  */}
          <div className="m-3">
            <div className="m-3 d-flex flex-row justify-content-center align-items-center">
              <label htmlFor="city-select-dropdown" className="mx-1">
                Select a city:
              </label>

              <DropdownButton id="city-select-dropdown" title="Select">
                <Dropdown.ItemText>Select A City</Dropdown.ItemText>
                {allCities.map((thisCity, index) => {
                  return (
                    <Dropdown.Item
                      as="button"
                      key={index}
                      onClick={() => handleCitySelection(thisCity, false)}
                    >
                      {thisCity.city}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </div>

            {/* Select Nearest Cities  */}
            <div className="d-flex justify-content-between flex-column m-1 p-1">
              <div>
                <div className="text-center">Or Select A City Nearby</div>
                <div className="text-center">(select multiple)</div>
              </div>
              <div className="d-flex justify-content-between flex-row m-1 p-1">
                {closestThreeCities().map((thisCity, index) => {
                  return (
                    <ToggleButton
                      key={index}
                      className="mb-2"
                      type="checkbox"
                      variant="outline-primary"
                      checked={selectedCities.some(
                        (selectedCity) => selectedCity.id === thisCity.id
                      )}
                      onClick={() => {
                        handleCitySelection(
                          thisCity,
                          selectedCities.some(
                            (selectedCity) => selectedCity.id === thisCity.id
                          )
                        );
                      }}
                    >
                      {allCities.length > 0 && thisCity.city}
                      {selectedCities.some(
                        (selectedCity) => selectedCity.id === thisCity.id
                      ) && allIconComponents.checkmark}
                    </ToggleButton>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FEEDBACK: Searching for CATEGORIES in CITIES */}
          <FilterFeedback />

          <div className="m-4 d-flex flex-row justify-content-center align-items-center">
            <Button
              size="lg"
              variant="outline-primary"
              onClick={() => setShowFilterOffCanvas(false)}
            >
              View Results
            </Button>
          </div>
        </Offcanvas.Body>
      </Container>
    </Offcanvas>
  );
}

export default DiscountFilterOffCanvas;
