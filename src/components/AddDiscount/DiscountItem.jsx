import { useSelector } from "react-redux";
import DiscountModal from "./DiscountModal";
import Card from "react-bootstrap/Card";
import "./DiscountItem.css";
import { IconContext } from "react-icons";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import EditVendorModal from "../AddVendor/EditVendorModal";
import { useState } from "react";

function DiscountItem({ discount, today }) {
  const categories = useSelector((store) => store.categories);
  const category = categories.find(
    (cat) => cat.id === Number(discount.category_id)
  );
  const vendors = useSelector((store) => store.vendors);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const vendor = vendors.find((vend) => vend.id === Number(discount.vendor_id));

  const expiredResult = isExpired();
  const startedResult = isStarted();

  // This function will return a formatted date to YYYY/MM/DD
  // returns current date if null was passed in
  function formatDate(dateDirty) {
    if (dateDirty === null) {
      return today;
    }
    let niceDate = new Date(dateDirty);
    return niceDate.toISOString().split("T")[0];
  }
  // This function will compare the current date with the expiration date on
  // this discount returning if the discount is expired or running
  function isExpired() {
    if (
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

  return (
    <>
      <div className="d-flex justify-content-center">
        <div
          onClick={() => setShowEditDiscount(true)}
          className={`hover-shadow mx-1 col col-md-9 col-lg-6 ${
            discount.is_shown && expiredResult && startedResult
              ? `bg-primary`
              : `bg-light`
          } rounded border border-primary border-1 my-1 p-1 d-flex justify-content-center align-items-center`}
        >
          <div className="row fill-container">
            <div className="col-2">
              <div
                className={`d-flex ${
                  discount.is_shown && expiredResult && startedResult
                    ? `text-light`
                    : `text-primary`
                } rounded w-100 flex-column justify-content-center align-items-center fill-container`}
              >
                {categories.length > 0 && (
                  <IconContext.Provider value={{ size: "2em" }}>
                    {allIconComponents[category.icon_class]}
                  </IconContext.Provider>
                )}
              </div>
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
                        <small>
                          {vendor?.address}, {vendor?.city},{" "}
                          {vendor?.state_code}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 p-1">
                  <div
                    className={`p-1 ${
                      discount.is_shown && expiredResult && startedResult
                        ? `bg-warning`
                        : `bg-secondary`
                    } rounded d-flex justify-content-center align-items-center fill-container`}
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
