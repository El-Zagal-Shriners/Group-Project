import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import UpdatedNavBar from "../Nav/Nav";

function AdminDiscountPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const vendors = useSelector((store) => store.vendors);
  const discounts = useSelector(
    (store) => store.discounts.adminDiscountsReducer
  );

  console.log("discounts", discounts);
  console.log("vendors", vendors);

  useEffect(() => {
    dispatch({
      type: "GET_ADMIN_DISCOUNTS",
    });
    console.log("discounts", discounts);
  }, []);

  useEffect(() => {
    dispatch({
      type: "FETCH_VENDORS",
    });
    console.log("vendor", vendors);
  }, []);

  return (
    <>
      <UpdatedNavBar />
      <h2>Admin Discount Page</h2>
      <div className="text-primary">Vendors {vendors.map(vendor => (
                        <div className="text-primary">{vendor.name}, {vendor.city}</div>
                    ))}</div>
      <div className="text-primary">Discounts {discounts.map(discount => (
                        <div className="text-primary">{discount.description}</div>
                        
                    ))}</div>
    </>
  
  );
}

export default AdminDiscountPage;
