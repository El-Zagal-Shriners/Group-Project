import { useSelector } from "react-redux";
import DiscountModal from "./DiscountModal";
import Card from "react-bootstrap/Card";
import "./DiscountItem.css";
import { IconContext } from "react-icons";
import { allIconComponents } from "../../allIconComponents/allIconComponents";
import EditVendorModal from "../AddVendor/EditVendorModal";

function DiscountItem({ discount }) {
  const categories = useSelector((store) => store.categories);
  const category = categories.find(
    (cat) => cat.id === Number(discount.category_id)
  );
  const vendors = useSelector((store) => store.vendors);
  const vendor = vendors.find((vend) => vend.id === Number(discount.vendor_id));

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="hover-shadow mx-1 col col-md-9 col-lg-6 bg-primary rounded my-1 p-1 d-flex justify-content-center align-items-center">
          <div className="row fill-container">
            <div className="col-2">
              <div className="d-flex text-light flex-column justify-content-center align-items-center fill-container">
                <IconContext.Provider value={{ size: "2em" }}>
                  {allIconComponents[category.icon_class]}
                </IconContext.Provider>
              </div>
            </div>
            <div className="col-10">
              <div className="row">
                <div className="col-8 p-1">
                  <div className="px-1 py-2 bg-light rounded d-flex justify-content-start align-items-center">
                    <div className="mx-1">
                      <div className="text-start">
                        <h5>{vendor?.name}</h5>
                      </div>
                      <div className="discount-address ms-2 text-start text-muted fw-light">
                        <small>
                          {vendor?.address}, {vendor?.city}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 p-1">
                  <div className="p-1 bg-warning rounded d-flex justify-content-center align-items-center fill-container">
                    <div className="discount-text fw-bold">
                      {discount.discount_summary}
                    </div>
                    <div>
                    <DiscountModal className="d-flex justify-content-center" discount={discount} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="d-flex justify-content-center">
        <div className="col-10">
          <div className="row">
            <div className="px-1 py-2 rounded d-flex justify-content-start align-items-center">
              <Card
                key={discount.id}
                className="w-100 d-flex flex-wrap border border-2 border-primary p-3 rounded-3 mt-3"
              >
                <Card.Header className=" vendor text-center w-100 text-primary border border-2 p-3 mt-3 border-primary fw-bold">
                  {vendor?.name}
                </Card.Header>
                <Card.Body>
                  <Card.Title className="text-center w-100 text-primary fw-bold">
                    {discount.discount_description}
                  </Card.Title>
                  <Card.Text className="text-center w-100 text-primary fw-light">
                    {discount.discount_summary}
                  </Card.Text>
                  <div className="text-center w-100 text-primary">
                    <DiscountModal discount={discount} />
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default DiscountItem;
