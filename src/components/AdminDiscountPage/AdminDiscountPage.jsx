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
import Button from "react-bootstrap/Button";
import AddVendorModal from "../AddVendor/AddVendor";
import AddDiscountModal from "./AddDiscount";

function AdminDiscountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allVendors = useSelector((store) => store.vendors);
  const discounts = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );

  function addVendor() {
    history.push("/adminaddvendor");
  }

  function addDiscount() {
    history.push("/adminadddiscount");
  }

  let filteredDiscounts = [...discounts];
  const [currentSelected, setCurrentSelected] = useState("default");
  if (currentSelected !== "default") {
    filteredDiscounts = filteredDiscounts.filter(
      (discount) => Number(discount.vendor_id) === Number(currentSelected)
    );
  }

  function handleSelect(selectedValue) {
    setCurrentSelected(selectedValue);
    console.log("selected value", selectedValue);
  }

  console.log("discounts", discounts);
  console.log("vendors", allVendors);

  useEffect(() => {
    dispatch({ type: "GET_ADMIN_DISCOUNTS" });
    dispatch({ type: "FETCH_VENDORS" });
    dispatch({ type: "GET_CATEGORIES" });
  }, []);

  return (
    <>
      <UpdatedNavBar />
      <div className="justify-content-center container text-center col col-lg-6">
        <AddVendorModal />
      </div>
      <div className="container text-center col col-lg-6">
        <AddDiscountModal />
      </div>
      <div className="container text-center col col-lg-6">
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
      </div>
      <section className="w-100 flex-wrap">
        {currentSelected !== "default"
          ? filteredDiscounts.map((discount) => {
              return <DiscountItem key={discount.id} discount={discount} />;
            })
          : filteredDiscounts.map((discount, vendors) => {
              return <DiscountItem key={discount.id} discount={discount} />;
            })}
      </section>
    </>
  );
}

export default AdminDiscountPage;
