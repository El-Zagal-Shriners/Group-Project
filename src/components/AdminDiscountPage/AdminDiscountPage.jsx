import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import DiscountItem from "../AddDiscount/DiscountItem";
import AddVendorModal from "../AddVendor/AddVendor";
import AddDiscountModal from "../AddDiscount/AddDiscount";
import EditVendorModal from "../AddVendor/EditVendorModal";

function AdminDiscountPage(vendor) {
  const dispatch = useDispatch();
  const history = useHistory();
  const allVendors = useSelector((store) => store.vendors);
  const discounts = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );

  let filteredDiscounts = [...discounts];
  const [currentSelected, setCurrentSelected] = useState("default");
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

  const removeVendor = () => {
    dispatch({
      type: "REMOVE_VENDOR",
      payload: currentSelected,
    });
    setCurrentSelected("default");
    history.push("/admindiscounts");
  };

  useEffect(() => {
    dispatch({ type: "GET_ADMIN_DISCOUNTS" });
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "GET_CATEGORIES" });
  }, []);

  return (
    <>
      <UpdatedNavBar />
      <h1 className="text-primary text-center mt-3 mb-0">Discount Manager</h1>
      <br />
      <div className="d-flex justify-content-around">
        <AddVendorModal />
        <AddDiscountModal />
      </div>

      <div className="container text-center col col-lg-6 pb-0">
        <DropdownButton
          as={ButtonGroup}
          key="primary"
          id={`discountDropdown`}
          variant="primary"
          title="Select Vendor"
          className="w-75"
          onSelect={handleSelect}
        >
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
        </DropdownButton>
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
              </span>
            </h5>
            <button className="btn btn-primary mb-1" onClick={removeVendor}>
              Remove
            </button>
            <br />
            <EditVendorModal
              allVendors={allVendors}
              currentSelected={currentSelected}
            />
          </div>
        )}
      </div>
      <section className="w-100 flex-wrap">
        {filteredDiscounts.map((discount) => {
          return <DiscountItem key={discount.id} discount={discount} />;
        })}
      </section>
    </>
  );
}

export default AdminDiscountPage;
