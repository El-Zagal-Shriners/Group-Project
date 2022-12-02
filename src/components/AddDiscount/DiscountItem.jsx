import { useSelector } from "react-redux";
import DiscountModal from "./DiscountModal";
import "./DiscountItem.css";
import { IconContext } from "react-icons";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import { useState } from "react";

function DiscountItem({ discount, today }) {
  const categories = useSelector((store) => store.categories);
  const category = categories.find(
    (cat) => cat.id === Number(discount.category_id)
  );
  const vendors = useSelector((store) => store.vendors);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const vendor = vendors.find((vend) => vend.id === Number(discount.vendor_id));
  
  // set to the value returned from isExpired function
  const expiredResult = isExpired();
  // set to the value returned from isStarted function
  const startedResult = isStarted();

  // This function will return a formatted date to YYYY/MM/DD
  // returns current date if null was passed in
  function formatDate(dateDirty) {
    if (dateDirty === null) {
      return today;
    }
    // new date object based on the passed date
    let niceDate = new Date(dateDirty);
    // returns only the date portion of the formatted date - YYYY/MM/DD format
    return niceDate.toISOString().split("T")[0];
  }
  // This function will compare the current date with the expiration date on
  // this discount returning if the discount is expired or running
  function isExpired() {
    if (
      // format the date and check if it's today's date or a future date
      // returns true if the date is future or today
      // otherwise returns false
      // compares dates in YYYY/MM/DD
      formatDate(discount.expiration_date) >= today ||
      discount.expiration_date === null
    ) {
      return true;
    } else {
      return false;
    }
  }
  // This function will compare the date with the start date and return
  // if the discount has started or not
  // returns true if the start date is today or a past date
  // otherwises returns false
  // Compares in YYYY/MM/DD format
  function isStarted() {
    if (
      formatDate(discount.start_date) <= today ||
      discount.start_date === null
    ) {
      return true;
    } else {
      return false;
    }
  }
  // renders a card for each discount with basic information about each
  // discount, display colors and infomation is conditional to the 
  // status of the discount (active or inactive)
  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          onClick={() => setShowEditDiscount(true)}
          className={`hover-shadow mx-1 col col-md-9 col-lg-6 ${
            discount.is_shown && expiredResult && startedResult
              ? `bg-primary`
              : `bg-secondary text-muted`
          } rounded my-1 p-1 d-flex justify-content-center align-items-center`}
        >
          <div className="row fill-container">
            <div className="col-2 p-0 d-flex flex-column justify-content-center">
              {discount.is_shown && expiredResult && startedResult ? (
                <div
                  className={`d-flex text-light rounded w-100 flex-column justify-content-center align-items-center fill-container`}
                >
                  {categories.length > 0 && (
                    <IconContext.Provider value={{ size: "2em" }}>
                      {allIconComponents[category.icon_class]}
                    </IconContext.Provider>
                  )}
                </div>
              ) : (
                <span className="">Inactive</span>
              )}
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-8 p-1">
                  <div className="px-1 py-2 bg-light rounded d-flex justify-content-start align-items-center">
                    <div className="mx-1 d-flex flex-column justify-content-between align-items-start">
                      <div className="text-start">
                        <h5>{vendor?.name}</h5>
                      </div>
                      <div className="discount-address text-start text-muted fw-light">
                        {/* BEGIN TERNARY - Conditional message if the discount is regional or not */}
                        {discount.is_regional ? (
                          <small>
                            Regional Discount
                            <br />
                            (Click for details)
                          </small>
                        ) : (
                          <small>
                            {vendor?.address} <br />
                            {vendor?.city}, {vendor?.state_code}
                          </small>
                        )}
                        {/* End ternary */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 p-1">
                  <div
                  // BEGIN TERNARY
                    className={`p-1 ${
                      discount.is_shown && expiredResult && startedResult
                        ? `bg-warning`
                        : `bg-secondary`
                    } rounded d-flex justify-content-center align-items-center fill-container`}
                    // END TERNARY
                  >
                    <div className="discount-text fw-bold">
                      {discount.discount_summary}
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Modal for displaying/editting a discount - show on click of discount summary card */}
        <DiscountModal
          className="d-flex justify-content-center"
          isExpired={isExpired}
          isStarted={isStarted}
          setShowEditDiscount={setShowEditDiscount}
          showEditDiscount={showEditDiscount}
          discount={discount}
          vendor={vendor}
        />
      </div>
    </>
  );
}

export default DiscountItem;
