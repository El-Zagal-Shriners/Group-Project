import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdatedNavBar from "../Nav/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DiscountItem from "../AddDiscount/DiscountItem";
import AddVendorModal from "../AddVendor/AddVendor";
import AddDiscountModal from "../AddDiscount/AddDiscount";
import EditVendorModal from "../AddVendor/EditVendorModal";
import ConfirmDeleteModal from "../AddDiscount/ConfirmDeleteModal";
import Button from "react-bootstrap/Button";

function AdminDiscountPage(vendor) {
  const dispatch = useDispatch();
  const allVendors = useSelector((store) => store.vendors);
  const discounts = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );

  let filteredDiscounts = [...discounts];
  const [currentSelected, setCurrentSelected] = useState("default");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditVendor, setShowEditVendor] = useState(false);
  // variable to store the current date
  let today = new Date().toISOString().split("T")[0];
  if (currentSelected !== "default") {
    filteredDiscounts = filteredDiscounts.filter(
      (discount) => Number(discount.vendor_id) === Number(currentSelected)
    );
  }

  function handleSelect(selectedValue, event) {
    // only filter if event is not a button. done to prevent
    // the render of vendor discount information when "remove" button was clicked
    if (event.target.type !== "button") {
      setCurrentSelected(selectedValue);
    }
  }
  // function to remove a vendor by id
  // resets currentSelected and delete confirmation control state to default
  const removeVendor = () => {
    dispatch({
      type: "REMOVE_VENDOR",
      payload: currentSelected,
    });
    setCurrentSelected("default");
    setShowDeleteConfirmation(false);
  };
  // get admin discounts, vendors and catergories on page load
  useEffect(() => {
    dispatch({ type: "GET_ADMIN_DISCOUNTS" });
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "GET_CATEGORIES" });
  }, []);
  // render the admin discount page
  return (
    <>
      <UpdatedNavBar />
      <h1 className="text-primary text-center mt-3 mb-0">Discount Manager</h1>
      <br />
      <div className="w-md-100 w-lg-50 mx-auto d-flex justify-content-around align-items-center col-md-9 col-lg-6">
        <AddVendorModal />
        <AddDiscountModal />
      </div>

      <div className="container text-center col col-lg-6 pt-2 pb-0">
        {/* Dropdown to select vendor */}
        <Dropdown className="col" onSelect={handleSelect}>
          <Dropdown.Toggle>Select Vendor</Dropdown.Toggle>
          <Dropdown.Menu className="custom-scroll">
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
        {/* Display the current selected vendor after one is selected */}
        {currentSelected !== "default" && (
          <div className="border border-primary border-2 rounded px-3 mt-2 w-100">
            <h5 className="text-center w-100 mt-1">
              Vendor:&nbsp;
              <span className="text-primary fw-bold">
                {
                  allVendors[
                    allVendors.findIndex(
                      (item) => Number(item.id) === Number(currentSelected)
                    )
                  ]?.name
                }
                <br />
              </span>
            </h5>
            {/* Buttons to remove or edit the selected vendor */}
            <div className="w-100 d-flex justify-content-center align-items-center">
              <button
                className="btn btn-primary mb-2 col-6"
                onClick={() => setShowDeleteConfirmation(true)}
              >
                Remove
              </button>
              &nbsp;
              <Button
                variant="primary"
                className="mb-2 col-6"
                onClick={() => setShowEditVendor(true)}
              >
                Edit
              </Button>
              <EditVendorModal
                allVendors={allVendors}
                currentSelected={currentSelected}
                showEditVendor={showEditVendor}
                setShowEditVendor={setShowEditVendor}
              />
            </div>
          </div>
        )}
      </div>
      {/* Modal to confirm delete a vendor */}
      <ConfirmDeleteModal
        parentModalToggleSetter={false}
        hideThisModalToggle={showDeleteConfirmation}
        hideThisModalToggleSetter={setShowDeleteConfirmation}
        deleteFunction={removeVendor}
        deleteType={"vendor"}
      />
      {/* Display the discount cards */}
      <div className="w-100 d-flex justify-content-center align-items-center col col-md-9 col-lg-6">
        <section className="col col-md-9 col-lg-6 w-100">
          <hr className="my-2 mx-auto col col-md-9 col-lg-6" />
          {filteredDiscounts.map((discount) => {
            return (
              <DiscountItem
                key={discount.id}
                discount={discount}
                today={today}
              />
            );
          })}
        </section>
      </div>
    </>
  );
}

export default AdminDiscountPage;
