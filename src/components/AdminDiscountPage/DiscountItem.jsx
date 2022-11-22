import { useSelector } from "react-redux";
import DiscountModal from "./DiscountModal";

function DiscountItem({ discount }) {
  const vendors = useSelector(store => store.vendors);
  const vendor = vendors.find(vend => (
    vend.id === Number(discount.vendor_id)
  ));

  return (
    <div
      key={discount.id}
      className="w-100 d-flex flex-wrap border border-2 border-primary p-3 rounded-3 mt-3"
    >
      <h3 className="text-center w-100 text-primary">{discount.discount_description}</h3>
      <h3 className="text-center w-100 text-primary">{discount.discount_summary}</h3>
      <h4>{vendor?.name}</h4>
      <DiscountModal discount={discount} />
    </div>
  );
}

export default DiscountItem;
