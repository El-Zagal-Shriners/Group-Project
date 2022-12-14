import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import FilterFeedback from "./FilterFeedback";
import "./DiscountCard.css";

// react boostrap components
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "react-bootstrap";

// react icons object imported from module
import { allIconComponents } from "../../allIconComponents/allIconComponents";

function DiscountFilterOffCanvas({
  showFilterOffCanvas,
  setShowFilterOffCanvas,
  locationPulled,
}) {
  const dispatch = useDispatch();

  // selects all cities
  // if location was grabbed, these will be in order nearest to farthest
  const allCities = useSelector((store) => store.cities.allCitiesReducer);

  // select all categories
  const allCategories = useSelector((store) => store.categories);

  // redux stores for managing search filter parameters
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
      const updatedCitiesArr = removeObjectFromArray(thisCity, selectedCities);
      dispatch({ type: "SET_SELECTED_CITIES", payload: updatedCitiesArr });
    } else {
      // if thisCity is already in selectedCities arrray, don't add it again (return)
      // else add thisCity to selectedCities array
      if (selectedCities.includes(thisCity)) {
        return;
      } else {
        const updatedCitiesArr = [...selectedCities];
        updatedCitiesArr.push(thisCity);
        dispatch({ type: "SET_SELECTED_CITIES", payload: updatedCitiesArr });
      }
    }
  }

  // takes a category object
  function handleCategorySelection(thisCat) {
    // if thisCat is already in selectedCategories arrray, don't add it again (return)
    // else add thisC to selectedCategories array
    if (selectedCategories.some((catObj) => thisCat.id === catObj.id)) {
      return;
    } else {
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
    // console.log("inRemoveItemFromArray", array, objectToRemove);
    let filteredArr = array.filter((thisItem) => {
      return thisItem.id !== objectToRemove.id;
    });
    // console.log("inRemoveItemFromArray, filtered array is", filteredArr);

    return filteredArr;
  }

  // this function takes an array of city objects and returns
  // a new array with the first three objects only
  function closestCities() {
    const closestCities = [];
    if (locationPulled) {
      for (let i = 0; i <= 2; i++) {
        closestCities.push(allCities[i]);
      }
    } else {
      closestCities.push({ city: "Fargo" }, { city: "Moorhead" });
    }
    return closestCities;
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
      <Container className="bg-white fill-container">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="vh-100">
          <h2 className="fw-bold text-primary">Refine Search</h2>
          <hr />
          {/* Select a Discount Category  */}
          <div className="m-1 p-1">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <label htmlFor="category-select-dropdown" className="mx-1">
                Select categories:
              </label>
              <Dropdown id="category-select-dropdown" title="Select">
                <Dropdown.Toggle>Select</Dropdown.Toggle>
                <Dropdown.Menu className="custom-scroll">
                  {allCategories.map((thisCat, index) => {
                    return (
                      <Dropdown.Item
                        as="button"
                        key={index}
                        onClick={() => handleCategorySelection(thisCat)}
                      >
                        {thisCat.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <hr />

          {/* Select Nearest Cities  */}
          <div className="d-flex justify-content-between flex-column m-1 p-1">
            <div>
              {/* if location was pulled display closest three cities. Else display Fargo and Moorhead */}
              {locationPulled ? (
                <div className="text-center">Select from nearby cities:</div>
              ) : (
                <div className="text-center">Select from:</div>
              )}
            </div>
            <div className="d-flex justify-content-between flex-row p-1">
              {closestCities().map((thisCity, index) => {
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
                    <span> </span>
                    {selectedCities.some(
                      (selectedCity) => selectedCity.id === thisCity.id
                    ) && allIconComponents.checkmark}
                  </ToggleButton>
                );
              })}
            </div>
          </div>
          {/* Choose City From Dropdown */}
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="m-3 d-flex flex-row justify-content-center align-items-center">
              <label htmlFor="city-select-dropdown" className="mx-1">
                Or select any city:
              </label>
              <Dropdown>
                <Dropdown.Toggle> Select Cities</Dropdown.Toggle>
                <Dropdown.Menu className="custom-scroll">
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
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <hr />
          {/* FEEDBACK => Searching for CATEGORIES in CITIES */}
          <FilterFeedback />
          <hr />
          <div className="mb-3 d-flex flex-row justify-content-center align-items-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setShowFilterOffCanvas(false)}
            >
              View Results
            </Button>
          </div>
          <div className="text-center text-black fst-italic mx-3">
            * If no categories or cities are selected, all discounts will be
            displayed.
          </div>
        </Offcanvas.Body>
      </Container>
    </Offcanvas>
  );
}

export default DiscountFilterOffCanvas;
