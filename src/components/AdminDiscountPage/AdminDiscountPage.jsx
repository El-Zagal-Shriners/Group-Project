import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";

/* To-Do

  1. [x] Display all discounts that are relevant to this page (no filter)
  2. [x] Make the drop-down correctly set local state to the id of the vendor
  3. [x] Create a copy of the discounts into a new array that can be filtered
  4. [ ] If there is a selection, filter the discounts to only show discounts whose vendor
         id matches the local state vendor id from the drop-down
         (this is currently commented out, will need modified)
*/

function AdminDiscountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const vendors = useSelector((store) => store.vendors);
  const discounts = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );

  let filteredDiscounts = [...discounts];
  const [currentSelected, setCurrentSelected] = useState("default");
  // (STEP 2: activate the filter from local state)
  if (currentSelected !== "default") {
    filteredDiscounts = filteredDiscounts.filter(
      (discount) => Number(discount.vendor_id) === Number(currentSelected)
    );
  }

  function handleSelect(selectedValue) {
    setCurrentSelected(selectedValue);
    console.log(selectedValue);
  }

  console.log("discounts", discounts);
  console.log("vendors", vendors);

  useEffect(() => {
    dispatch({ type: "GET_ADMIN_DISCOUNTS" });
    dispatch({ type: "FETCH_VENDORS" });
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
          {vendors.map((vendor) => {
            return (
              <Dropdown.Item
                key={vendor.name}
                eventKey={vendor.id}
                active={Number(currentSelected) === Number(vendor.id) && true}
              >
                {vendor.name}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>

        <div className="text-primary">
          Discounts{" "}
          {discounts.map((discount) => (
            <div className="text-primary">{discount.description}</div>
          ))}
        </div>

        {/* This is where discounts should go, map over and show them (STEP 1) */}
        {/* use filteredDiscounts for the map here */}
      </div>
    </>
  );
}
{
  /* // <>
    //   <UpdatedNavBar />
    //   <h2>Admin Discount Page</h2>
    //   <div className="text-primary">
    //     Vendors{" "}
    //     {vendors.map((vendor) => ( */
}
{
  /* //       <div className="text-primary">
    //         {vendor.name}, {vendor.city}, {vendor.address}
    //       </div>
    //     ))}
    //   </div> */
}
{
  /* //   <div className="text-primary">
    //     Discounts{" "}
    //     {discounts.map((discount) => ( */
}
{
  /* //       <div className="text-primary">{discount.description}</div>
    //     ))}
    //   </div> */
}
{
  /* // </> */
}
{
  /* ); */
}

export default AdminDiscountPage;
