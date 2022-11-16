import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// react boostrap components
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "react-bootstrap";

// react icons object imported from module
import { allIconComponents } from "../../allIconComponents/allIconComponents";

function DiscountFilter({ setFilteredDiscounts, setShowFilter }) {
  const dispatch = useDispatch();

  // selects array of objects from discounts reducer with all available discounts
  const allDiscounts = useSelector((store) => store.discounts.discountsReducer);

  // selects all cities ordered closest to farthest
  const allCities = useSelector((store) => store.cities.allCitiesReducer);

  const allCategories = useSelector((store) => store.categories);

  // state that tracks the checked status of the three nearest cities
  const [cityOneChecked, setCityOneChecked] = useState(false);
  const [cityTwoChecked, setCityTwoChecked] = useState(false);
  const [cityThreeChecked, setCityThreeChecked] = useState(false);

  // state for managing search parameters
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [companySearchIn, setCompanySearchIn] = useState([]);

  function filterSearchResults(){
    console.log('in filterSearchResults', allDiscounts);

    

  //   // filter
  //   let filteredDiscounts = array.filter((thisItem) => {
  //     return thisItem !== itemToRemove;
  //   });
    
  //   return filteredArr;
  // }

  }



  useEffect(()=> filterSearchResults(), [selectedCategories, selectedCities]);


  function handleCitySelection(thisCity, cityIsSelected) {
    // if city is already selected, remove it from the selectedCities array
    // else (city not yet selected), add it to the selected Cities array
    if (cityIsSelected) {
      const updatedCitiesArr = removeItemFromArray(thisCity, selectedCities);
      setSelectedCities(updatedCitiesArr);
      console.log("in handleCitySelection, deselecting city", updatedCitiesArr);
    } else {
      // if thisCity is already in selectedCities arrray, don't add it again (return)
      // else add thisCity to selectedCities array
      if (selectedCities.includes(thisCity)) {
        return;
      } else {
        const updatedCitiesArr = [...selectedCities];
        updatedCitiesArr.push(thisCity);
        setSelectedCities(updatedCitiesArr);
      }
    }
  }

  function handleCategorySelection(thisCat, catIsSelected) {
    // if category is already selected, remove it from the selectedCities array
    // else (city not yet selected), add it to the selected Cities array
    if (catIsSelected) {
      const updatedCategoriesArr = removeItemFromArray(
        thisCat,
        selectedCategories
      );
      setSelectedCategories(updatedCategoriesArr);
    } else {
      // if thisCity is already in selectedCities arrray, don't add it again (return)
      // else add thisCity to selectedCities array
      if (selectedCategories.includes(thisCat)) {
        return;
      } else {
        const updatedCategoriesArr = [...selectedCategories];
        updatedCategoriesArr.push(thisCat);
        setSelectedCategories(updatedCategoriesArr);
      }
    }
  }

  // this function removes from the selected categories
  // and/or cities arrays items that the user deselects
  function removeItemFromArray(itemToRemove, array) {
    console.log("inRemoveItemFromArray", array, itemToRemove);

    let filteredArr = array.filter((thisItem) => {
      return thisItem !== itemToRemove;
    });
    return filteredArr;
  }

  useEffect(() => {
    dispatch({ type: "GET_CATEGORIES" });
    dispatch({ type: "GET_ALL_CITIES" });
    dispatch({ type: "GET_CLOSE_CITIES" });
    dispatch({ type: "GET_DISCOUNTS"});
  }, []);

  return (
    <Container>
      {/* Select a Discount Category  */}
      <div className="bg-light m-1 p-1">
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
                  onClick={() => handleCategorySelection(thisCat.name, false)}
                >
                  {thisCat.name}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      </div>

      <div className="d-flex justify-content-center m-1">IN</div>

      {/* Choose City From Dropdown  */}
      <div className="bg-light m-1 p-1">
        <div className="d-flex flex-row justify-content-center align-items-center">
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
                  onClick={() => handleCitySelection(thisCity.city, false)}
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
            <ToggleButton
              className="mb-2"
              type="checkbox"
              variant="outline-primary"
              checked={cityOneChecked}
              onClick={() => {
                handleCitySelection(allCities[0].city, cityOneChecked);
                setCityOneChecked(!cityOneChecked);
              }}
            >
              {allCities.length > 0 && allCities[0].city}
              {cityOneChecked && allIconComponents.checkmark}
            </ToggleButton>

            <ToggleButton
              className="mb-2"
              type="checkbox"
              variant="outline-primary"
              checked={cityTwoChecked}
              onClick={() => {
                handleCitySelection(allCities[1].city, cityTwoChecked);
                setCityTwoChecked(!cityTwoChecked);
              }}
            >
              {allCities.length > 0 && allCities[1].city}
              {cityTwoChecked && allIconComponents.checkmark}
            </ToggleButton>

            <ToggleButton
              className="mb-2"
              type="checkbox"
              variant="outline-primary"
              checked={cityThreeChecked}
              onClick={() => {
                handleCitySelection(allCities[2].city, cityThreeChecked);
                setCityThreeChecked(!cityThreeChecked);
              }}
            >
              {allCities.length > 0 && allCities[2].city}
              {cityThreeChecked && allIconComponents.checkmark}
            </ToggleButton>
          </div>
        </div>
      </div>

      {/* FEEDBACK: Searching for CATEGORIES in CITIES */}

      <div className="d-flex flex-column bg-light align-items-center">
        {(selectedCities.length > 0 || selectedCategories.length > 0) && (
          <div>Searching:</div>
        )}
        <div className="d-flex justify-content-center align-items-center m-1">
          <div>
            {selectedCategories.map((thisCat, index) => {
              return (
                <Button
                  size="sm"
                  key={index}
                  className="d-flex justify-content-center align-items-center m-1"
                  onClick={() =>
                    setSelectedCategories(
                      removeItemFromArray(thisCat, selectedCategories)
                    )
                  }
                >
                  {thisCat} {allIconComponents.exit}
                </Button>
              );
            })}
          </div>
          {selectedCities.length > 0 && selectedCategories.length > 0 && (
            <div>IN</div>
          )}
          <div>
            {selectedCities.map((thisCity, index) => {
              return (
                <Button
                  key={index}
                  size="sm"
                  className="d-flex justify-content-center align-items-center m-1"
                  onClick={() =>
                    setSelectedCities(
                      removeItemFromArray(thisCity, selectedCities)
                    )
                  }
                >
                  {thisCity}
                  {allIconComponents.exit}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <Button
          size="lg"
          variant="outline-primary"
          onClick={() => setShowFilter(false)}
        >
          View Results
        </Button>
      </div>
    </Container>
  );
}

export default DiscountFilter;
