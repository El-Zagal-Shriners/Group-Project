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

function DiscountFilter() {
  const dispatch = useDispatch();

  // selects array of objects from discounts reducer with all available discounts
  const allDiscounts = useSelector((store) => store.discounts);

  // selects all cities ordered closest to farthest
  const allCities = useSelector((store) => store.cities);

  const allCategories = useSelector((store) => store.categories);

  // state that tracks the checked status of the three nearest cities
  const [cityOneChecked, setCityOneChecked] = useState(true);
  const [cityTwoChecked, setCityTwoChecked] = useState(false);
  const [cityThreeChecked, setCityThreeChecked] = useState(false);

  // state that contains a list of selected cities
  const [selectedCities, setSelectedCities] = useState([]);





  useEffect(() => dispatch({ type: "GET_CATEGORIES" }), []);
  useEffect(()=> dispatch({type: "GET_ALL_CITIES"}), []);

  return (
    <Container>
      {/* Select a Discount Category  */}
      <div className="bg-light m-1 p-1">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <label htmlFor="category-select-dropdown" className="mx-1">
            What are you looking for?
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

      {/* Select Nearest Cities  */}
      <div className="d-flex justify-content-between bg-light m-1 p-1">
        <div>
          <div>Nearby Cities:</div>
          <div>(select multiple)</div>
        </div>
        <ToggleButton
          className="mb-2"
          type="checkbox"
          variant="outline-primary"
          checked={cityOneChecked}
          onClick={() => setCityOneChecked(!cityOneChecked)}
        >
          Fargo
          {/* {allCities[0].name} */}
        </ToggleButton>

        <ToggleButton
          className="mb-2"
          type="checkbox"
          variant="outline-primary"
          checked={cityTwoChecked}
          onClick={() => setCityTwoChecked(!cityTwoChecked)}
        >
          Moorhead
          {/* {allCities[1].name} */}
        </ToggleButton>

        <ToggleButton
          className="mb-2"
          type="checkbox"
          variant="outline-primary"
          checked={cityThreeChecked}
          onClick={() => setCityThreeChecked(!cityThreeChecked)}
        >
          West Fargo
          {/* {allCities[2].name} */}
        </ToggleButton>
      </div>

      {/* Choose City From Dropdown  */}
      <div className="bg-light m-1 p-1">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <label htmlFor="city-select-dropdown" className="mx-1">
            Select a city:
          </label>
          <Dropdown id="city-select-dropdown">
            <Dropdown.Toggle variant="primary">Select</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Williston</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Bismark</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Grand Forks</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Searching for CATEGORIES in CITIES */}
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
