import UpdatedNavBar from "../Nav/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function AdminTrackingPage() {
  const dispatch = useDispatch();
  const allVendors = useSelector((store) => store.vendors);
  const allDiscountTracker = useSelector(
    (store) => store.discounts.adminDiscountsTracker
  );
  let filteredDiscountTracker = [];
  const [currentSelected, setCurrentSelected] = useState("default");

  if (currentSelected !== "default") {
    filteredDiscountTracker = allDiscountTracker.filter(
      (discount) => Number(discount.vendor_id) === Number(currentSelected)
    );
  }

  function handleSelect(event) {
    setCurrentSelected(event);
  }

  console.log("filter :>> ", filteredDiscountTracker);

  useEffect(() => {
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "FETCH_DISCOUNT_TRACKER" });
    dispatch({ type: "GET_ADMIN_DISCOUNTS" });
  }, []);

  return (
    <>
      <UpdatedNavBar />
      <div className="container d-flex flex-column justify-content-center align-items-center">
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

        <section>
          <p>Stuff</p>
        </section>
      </div>
    </>
  );
}

export default AdminTrackingPage;
