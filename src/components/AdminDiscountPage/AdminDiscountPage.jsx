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
  console.log('vendors', vendors)

  useEffect(() => {
    dispatch({
      type: "GET_ADMIN_DISCOUNTS"
    });
    console.log("discounts", discounts);
  }, []);

  useEffect(() => {
    dispatch({
      type: "GET_VENDORS"
    });
  }, [])

  return (
    <>
      <UpdatedNavBar />
      <h2>Admin Discount Page</h2> <h2> Discount Description</h2>
      
    </>
  );
}

export default AdminDiscountPage;
