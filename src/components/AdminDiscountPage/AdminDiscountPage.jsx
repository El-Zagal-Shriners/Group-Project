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
      <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="container text-center">
        <div className="card-body">
          <h5 className="card-title text-primary">Add Vendor</h5> <br />
          <p className="card-text">
            Administrative access to add vendor information.
          </p>
          <Button
            size="lg"
            variant="outline-primary"
            onClick={addVendor}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Add Vendor
          </Button>
        </div>
      </div>
      <div className="container text-center">
        <div className="card-body">
          <h5 className="card-title text-primary">Add Discount</h5> <br />
          <p className="card-text">
            Administrative access to add discount information.
          </p>
          <Button
            size="lg"
            variant="outline-primary"
            onClick={addDiscount}
            className="me-2 d-flex justify-content-center container text-center"
          >
            Add Discount
          </Button>
        </div>
      </div>
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
        <section className="w-100 d-flex flex-wrap">
          {currentSelected !== "default"
            ? filteredDiscounts.map((discount) => {
                return <DiscountItem key={discount.id} discount={discount} />;
              })
            : filteredDiscounts.map((discount, vendors) => {
                return <DiscountItem key={discount.id} discount={discount} />;
              })}
        </section>
      </div>
    </>
  );
}

export default AdminDiscountPage;
