import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import DiscountModal from "./DiscountModal";
import DiscountItem from "./DiscountItem";

function AdminDiscountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const vendors = useSelector((store) => store.vendors);
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
        <section className="w-100 d-flex flex-wrap">
          {currentSelected !== "default"
            ? filteredDiscounts.map((discount) => {
                return <DiscountItem discount={discount} />;
              })
            : filteredDiscounts.map((discount) => {
                return <DiscountItem discount={discount} />;
              })}
        </section>
      </div>
    </>
  );
}

export default AdminDiscountPage;
