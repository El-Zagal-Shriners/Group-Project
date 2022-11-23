import UpdatedNavBar from "../Nav/Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function AdminTrackingPage() {
  const dispatch = useDispatch();
  const allVendors = useSelector((store) => store.vendors);
  const allDiscountTracker = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );
  let filteredDiscountTracker = [];
  const [currentSelected, setCurrentSelected] = useState("default");

  if (currentSelected !== "default") {
    filteredDiscountTracker = allDiscountTracker?.filter(
      (discount) => Number(discount.vendor_id) === Number(currentSelected)
    );
  }

  function handleSelect(event) {
    setCurrentSelected(event);
  }

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

        <section className="w-100 d-flex flex-wrap">
          {currentSelected !== "default"
            ? filteredDiscountTracker.map((discount) => (
                <div
                  key={discount.id}
                  className="w-100 d-flex flex-wrap border border-2 border-primary p-3 rounded-3 mt-3"
                >
                  <h3 className="text-center w-100 text-primary">
                    {
                      allVendors[
                        allVendors.findIndex(
                          (item) =>
                            Number(item.id) === Number(discount.vendor_id)
                        )
                      ].name
                    }
                  </h3>
                  <h5 className="text-center w-100 text-primary">
                    {discount.description}
                  </h5>
                  <Card className="col-6 me-1 mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">
                        Past 7 Days
                      </Card.Title>
                      <Card.Text className="text-center">
                        {discount.seven_day_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="col mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">
                        Past Month
                      </Card.Title>
                      <Card.Text className="text-center">
                        {discount.thirty_day_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="col-6 me-1">
                    <Card.Body>
                      <Card.Title className="text-center">Past Year</Card.Title>
                      <Card.Text className="text-center">
                        {discount.one_year_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="col mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">All-Time</Card.Title>
                      <Card.Text className="text-center">
                        {discount.discounts_all_time}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))
            : allDiscountTracker.map((discount) => (
                <div
                  key={discount.id}
                  className="w-100 d-flex flex-wrap border border-2 border-primary p-3 rounded-3 mt-3"
                >
                  <h3 className="text-center w-100 text-primary">
                    {
                      allVendors[
                        allVendors.findIndex(
                          (item) =>
                            Number(item.id) === Number(discount.vendor_id)
                        )
                      ]?.name
                    }
                  </h3>
                  <h5 className="text-center w-100 text-primary">
                    {discount.description}
                  </h5>
                  <Card className="col-6 me-1 mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">
                        Past 7 Days
                      </Card.Title>
                      <Card.Text className="text-center">
                        {discount.seven_day_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="col mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">
                        Past Month
                      </Card.Title>
                      <Card.Text className="text-center">
                        {discount.thirty_day_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="col-6 me-1">
                    <Card.Body>
                      <Card.Title className="text-center">Past Year</Card.Title>
                      <Card.Text className="text-center">
                        {discount.one_year_count}
                      </Card.Text>
                    </Card.Body>
                  </Card>

                  <Card className="col mb-1">
                    <Card.Body>
                      <Card.Title className="text-center">All-Time</Card.Title>
                      <Card.Text className="text-center">
                        {discount.discounts_all_time}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
        </section>
      </div>
    </>
  );
}

export default AdminTrackingPage;
