import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

// react icons object imported from module
import { allIconComponents } from "../../allIconComponents/allIconComponents";

function FilterFeedback() {
  const dispatch = useDispatch();

  const selectedCities = useSelector(
    (store) => store.filter.selectedCitiesReducer
  );
  const selectedCategories = useSelector(
    (store) => store.filter.selectedCategoriesReducer
  );

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

  return (
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
                  dispatch({
                    type: "SET_SELECTED_CATEGORIES",
                    payload: removeObjectFromArray(thisCat, selectedCategories),
                  })
                }
              >
                <span className="me-1">{thisCat.name}</span>
                <span>{allIconComponents.exit}</span>
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
                className="d-flex justify-content-between align-items-center m-1"
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_CITIES",
                    payload: removeObjectFromArray(thisCity, selectedCities),
                  })
                }
              >
                <span className="me-1">{thisCity.city}</span>
                <span>{allIconComponents.exit}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FilterFeedback;
