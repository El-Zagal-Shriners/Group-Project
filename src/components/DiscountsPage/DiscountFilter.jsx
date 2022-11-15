import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// react boostrap components
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "react-bootstrap";

// react icons object imported from module
import {allIconComponents} from "../../allIconComponents/allIconComponents";

function DiscountFilter({setFilteredDiscounts}) {
  const dispatch = useDispatch();

  // selects array of objects from discounts reducer with all available discounts
  const allDiscounts = useSelector((store) => store.discounts);

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


  function handleCitySelection(thisCity, cityIsSelected){

      // if city is already selected, remove it from the selectedCities array
      // else (city not yet selected), add it to the selected Cities array
      if(cityIsSelected){
        const updatedCitiesArr = removeItemFromArray(thisCity, selectedCities);
        setSelectedCities(updatedCitiesArr);
        console.log('in handleCitySelection, deselecting city', updatedCitiesArr);
      } else {
        const updatedCitiesArr = selectedCities;
        updatedCitiesArr.push(thisCity);
        setSelectedCities(updatedCitiesArr);
      }
  }


  // this function removes from the selected categories
  // and/or cities arrays items that the user deselects
  function removeItemFromArray(itemToRemove, array){
    console.log('inRemoveItemFromArray', array, itemToRemove);

    let filteredArr = array.filter((thisItem)=>{
      return thisItem !== itemToRemove;
    });
    return filteredArr;
  }


  console.log('selected cities are', selectedCities);


  useEffect(() => dispatch({ type: "GET_CATEGORIES" }), []);
  useEffect(()=> dispatch({type: "GET_ALL_CITIES"}), []);
  useEffect(()=> dispatch({type: "GET_CLOSE_CITIES"}), []);

  return (
    <Container>
      {/* Select a Discount Category  */}
      <div className="bg-light m-1 p-1">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <label htmlFor="category-select-dropdown" className="mx-1">
            I'm Looking For
          </label>
          <Dropdown id="category-select-dropdown">
            <Dropdown.Toggle variant="primary">Select</Dropdown.Toggle>
            <Dropdown.Menu>
              {allCategories.map((thisCat, index)=> {
                return <Dropdown.Item key={index}>{thisCat.name}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="d-flex justify-content-center m-1">IN</div>

      {/* Choose City From Dropdown  */}
      <div className="bg-light m-1 p-1">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <label htmlFor="city-select-dropdown" className="mx-1">
            Select a city:
          </label>
          <Dropdown id="city-select-dropdown">
            <Dropdown.Toggle variant="primary">Select</Dropdown.Toggle>

            <Dropdown.Menu>
              {allCities.map((thisCity)=>{
                return <Dropdown.Item>{thisCity.city}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      

      {/* Select Nearest Cities  */}
      <div className="d-flex justify-content-between flex-column m-1 p-1">
        <div>
          <div className="text-center">Or Select A City Nearby</div>
          <div className="text-center">(select multiple)</div>
        </div>
        <div className= "d-flex justify-content-between flex-row m-1 p-1">
          <ToggleButton
            className="mb-2"
            type="checkbox"
            variant="outline-primary"
            checked={cityOneChecked}
            onClick={() => {
              handleCitySelection(allCities[0].city, cityOneChecked); 
              setCityOneChecked(!cityOneChecked)}}
          >
            {allCities.length>0 && allCities[0].city}
            {cityOneChecked && allIconComponents.BsFillCheckCircleFill}
          </ToggleButton>

          <ToggleButton
            className="mb-2"
            type="checkbox"
            variant="outline-primary"
            checked={cityTwoChecked}
            onClick={() => {
              handleCitySelection(allCities[1].city, cityTwoChecked); 
              setCityTwoChecked(!cityTwoChecked)}}
          >
            {allCities.length>0 && allCities[1].city}
            {cityTwoChecked && allIconComponents.BsFillCheckCircleFill}
          </ToggleButton>

          <ToggleButton
            className="mb-2"
            type="checkbox"
            variant="outline-primary"
            checked={cityThreeChecked}
            onClick={() => {
              handleCitySelection(allCities[2].city, cityThreeChecked); 
              setCityThreeChecked(!cityThreeChecked)}}
          >
            {allCities.length>0 && allCities[2].city}
            {cityThreeChecked && allIconComponents.BsFillCheckCircleFill}
          </ToggleButton>
        </div>
      </div>
      </div>

      

      {/* FEEDBACK: Searching for CATEGORIES in CITIES */}
      <div>
        <div className="d-flex flex-column bg-light align-items-center">
          <div>Searching For:</div>
          <div className="d-flex justify-content-center align-items-center m-1">
            <div>
              <Badge
                pill
                className="d-flex justify-content-center align-items-center m-1"
                bg="primary"
              >
                Food
              </Badge>
              <Badge
                pill
                className="d-flex justify-content-center align-items-center m-1"
                bg="primary"
              >
                Drinks
              </Badge>
            </div>
            <div>IN</div>
            <div>
              <Badge
                pill
                className="d-flex justify-content-center align-items-center m-1"
                bg="primary"
              >
                Fargo
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DiscountFilter;
