import UpdatedNavBar from "../Nav/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./AdminTrackingPage.css";
import AdminTrackedVendor from "./AdminTrackedVendor";
import AdminTrackingList from "./AdminTrackingList";

function AdminTrackingPage() {
  // Setup redux variables
  const dispatch = useDispatch();
  const allVendors = useSelector((store) => store.vendors);

  // Pull Store data
  const allDiscountTracker = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );

  // Setup local state and filtered discount variable
  let filteredDiscountTracker = [];
  const [currentSelected, setCurrentSelected] = useState("default");

  // If a vendor is selected, filter discounts based on vendor selected
  if (currentSelected !== "default") {
    filteredDiscountTracker = allDiscountTracker?.filter(
      (discount) => Number(discount.vendor_id) === Number(currentSelected)
    );
  }

  // Function to handle selection of filtered vendor.
  // Must be separate function as onSelect with anon function is deprecated
  function handleSelect(event) {
    setCurrentSelected(event);
  } // End handleSelect

  // useEffect to set needed redux stores on page load
  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "FETCH_DISCOUNT_TRACKER" });
    dispatch({ type: "GET_ADMIN_DISCOUNTS" });
  }, []);

  return (
    <>
      <UpdatedNavBar />

      {/* Page Heading */}
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1 className="fw-bold w-100 text-primary text-center">
          Discount Tracking
        </h1>
        <span className=" mb-1 fst-italic small text-center">
          *Discounts are updated when discount code is revealed
        </span>

        {/* Show Dropdown for selecting Vendor Filter */}
        <Dropdown onSelect={handleSelect} className="col mt-1">
          <Dropdown.Toggle>Select a Vendor</Dropdown.Toggle>
          <Dropdown.Menu className="custom-tracking-scroll">
            <Dropdown.Item
              eventKey="default"
              active={currentSelected === "default" && true}
            >
              All
            </Dropdown.Item>
            {allVendors.map((vendor) => {
              return (
                <Dropdown.Item
                  key={vendor.id}
                  eventKey={vendor.id}
                  active={Number(currentSelected) === Number(vendor.id) && true}
                >
                  {vendor.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {/* End Dropdown for selecting Vendor Filter */}

        {/* Show currently Selected Vendor */}
        {currentSelected !== "default" && (
          <AdminTrackedVendor
            allVendors={allVendors}
            currentSelected={currentSelected}
          />
        )}
        {/* End show currently selected Vendor */}

        <section className="col d-flex flex-wrap">
          {/* Show filtered discounts if a vendor is selected */}
          {currentSelected !== "default" ? (
            <AdminTrackingList
              arrayList={filteredDiscountTracker}
              allVendors={allVendors}
              currentSelected={currentSelected}
            />
          ) : (
            // Show all discounts if no vendor is selected
            <AdminTrackingList
              arrayList={allDiscountTracker}
              allVendors={allVendors}
              currentSelected={currentSelected}
            />
          )}
        </section>
      </div>
    </>
  );
}

export default AdminTrackingPage;
