import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// components
import DiscountCard from "./DiscountCard";
import DiscountFilterOffCanvas from "./DiscountFilterOffCanvas";
import { Spinner } from "react-bootstrap";
import FilterFeedback from "./FilterFeedback";

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

  // redux store containing all cities (ordered by location or not, based on if user allowed location services)
  const allCities = useSelector((store) => store.cities.allCitiesReducer);

  // manage input for search bar
  const [searchBarIn, setSearchBarIn] = useState("");

  const [showFilterOffCanvas, setShowFilterOffCanvas] = useState(false);

  // Location services:
  // local state to see if services are loading.
  const [loading, setLoading] = useState(true);

  const [locationPulled, setLocationPulled] = useState(false);

  // create a promise to get the user's current location.
  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // use Effect to get the users location on load if user's location services are
  // enabled, and if not load default location. Also used to handle asynchronous
  // tasks.
  useEffect(() => {
    // variable set to true when user is on this page.
    let subscribed = true;
    (async () => {
      // async function to await the retrieval of the user's location
      // then get the closest cities.
      const wait = await getPosition()
        .then((response) => {
          // location was pulled, set locationPulled to true;
          setLocationPulled(true);

          // In the response from getPosition, if subscribed is true,
          // perform async tasks. Otherwise if subscribed is false,
          // do not perform the async tasks.
          if (subscribed) {
            // bundle the latitude and longitude into a coordinates object
            const coordinates = {
              lat: response.coords.latitude,
              lng: response.coords.longitude,
            };
            // dispatch to check if the user's city exists in the DB.
            dispatch({
              type: "CHECK_CITY",
              payload: coordinates,
            });
            // dispatch to get the closest ciities.
            dispatch({
              type: "GET_CLOSE_CITIES",
              payload: coordinates,
            });
            dispatch({ type: "GET_MEMBER_DISCOUNTS" });
          }
        })
        // if User does not have location services enabled, show default locations.
        .catch((err) => {
          // error code 1 appears if user does not have location services enabled.
          if (err.code === 1) {
            dispatch({ type: "GET_ALL_CITIES" });
            dispatch({ type: "GET_MEMBER_DISCOUNTS" });
          } else {
            console.log("Error resolving getPosition", err);
          }
        });
      // once the above function, getPosition(), resolves check if
      // subscribed is true and if so, set loading equal to false and show
      // the discounts.
      if (subscribed) {
        setLoading(false);
      }
    })();
    // cleanup function to stop asynchronous tasks
    // when user switches pages to stop memory leaks and potential
    // app crashes.
    return () => (subscribed = false);
  }, []);

  function filterDiscounts() {
    // push all search filter parameters into one array
    const allSelected = selectedCities
      .map((item) => item.city)
      .concat(selectedCategories.map((item) => item.name));

    // declare new array to hold filtered discount results
    let filteredArray = [];

    // ~~~ Create new array with filtered results
    // if cities are selected, but no categories are selected
    //    => push discounts with selected cities to new array
    // else if categories are selecte, but not cities are selected
    //    => push discounts with selected categories to new array
    // else if both cities and categories are selected
    //    => push discounts with both selected cities and categories to new array
    // else both seleceted arrays are empty
    //    => push all discounts to new array
    if (selectedCities.length > 0 && selectedCategories.length === 0) {
      filteredArray = allMemberDiscounts.filter((discount) => {
        return allSelected.includes(discount.city);
      });
    } else if (selectedCities.length === 0 && selectedCategories.length > 0) {
      filteredArray = allMemberDiscounts.filter((discount) => {
        return allSelected.includes(discount.category_name);
      });
    } else if (selectedCities.length > 0 && selectedCities.length > 0) {
      filteredArray = allMemberDiscounts.filter((discount, index) => {
        return allSelected.includes(discount.city);
      });
      filteredArray = filteredArray.filter((discount) => {
        return allSelected.includes(discount.category_name);
      });
    } else {
      filteredArray = allMemberDiscounts;
    }

    // run filteredArray through search by company search bar
    if (searchBarIn.length > 0) {
      filteredArray = filteredArray.filter((discount, index) => {
        let thisVendorName = discount.vendor_name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "");
        let searchedVendor = searchBarIn
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]/g, "");

        if (thisVendorName.search(searchedVendor) !== -1) {
          return true;
        } else {
          return false;
        }
      });
    }

    filteredArray = orderDiscountsByLocation(filteredArray);

    dispatch({ type: "SET_FILTERED_DISCOUNTS", payload: filteredArray });
  }

  function orderDiscountsByLocation(array) {
    console.log("location pulled?", locationPulled);
    // if location services were successfully pulled, sort discounts by city distance
    if (locationPulled) {
      return array?.sort((thisDiscount, nextDiscount) => {
        // this returns the index of the discount's city in the allCities array (which is ordered by distance)
        let thisDiscountCityIndex = allCities.findIndex((thisCity) => {
          return thisCity.city === thisDiscount.city;
        });
        let nextDiscountCityIndex = allCities.findIndex((thisCity) => {
          return thisCity.city === nextDiscount.city;
        });

        if (thisDiscountCityIndex < nextDiscountCityIndex) {
          return -1;
        } else if (thisDiscountCityIndex > nextDiscountCityIndex) {
          return 1;
        } else {
          return 0;
        }
      });
      // if they are not activated, sort discounts by city alphabetically
    } else {
      return array;
    }
  }

  useEffect(
    () => filterDiscounts(),
    [
      selectedCategories,
      selectedCities,
      allMemberDiscounts,
      searchBarIn,
      loading,
    ]
  );

  // useEffect(()=> console.log('filtered Ds', filteredDiscounts));

  if (loading) {
    return (
      <>
        <UpdatedNavBar />
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </>
    );
  } else {
    return (
      <>
        <UpdatedNavBar />
        <div className="bg-light p-1 d-flex justify-content-center">
          <h1 className="display-5 text-primary">Your Shriner Discounts</h1>
        </div>
        <div className="d-flex col flex-column justify-content-around align-items-center bg-light sticky-top">
          <div className="bg-light col col-md-9 col-lg-6 p-2 rounded-bottom d-flex justify-content-center">
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                onClick={() => setShowFilterOffCanvas(true)}
                className="me-2 d-flex justify-content-center"
              >
                {selectedCities.length > 0 || selectedCategories.length > 0
                  ? "Edit"
                  : "Refine"}{" "}
                Search
              </Button>
            </div>

            {(selectedCategories.length > 0 || selectedCities.length > 0) && (
              <FilterFeedback />
            )}
          </div>
          <div className="col-11 col-md-9 col-lg-6">
            <FloatingLabel controlId="floatingInput" label="Search By Company">
              <Form.Control
                className="company-search"
                value={searchBarIn}
                type="text"
                placeholder="Type A Company"
                onChange={(e) => setSearchBarIn(e.target.value)}
              />
            </FloatingLabel>
          </div>
        </div>

        {filteredDiscounts.map((thisDiscount, index) => {
          return <DiscountCard key={index} thisDiscount={thisDiscount} />;
        })}
        <DiscountFilterOffCanvas
          showFilterOffCanvas={showFilterOffCanvas}
          setShowFilterOffCanvas={setShowFilterOffCanvas}
        />
      </>
    );
  }
}

export default DiscountsPage;
