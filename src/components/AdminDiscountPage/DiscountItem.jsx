import DiscountModal from "./DiscountModal";

function DiscountItem({discount}) {
    console.log("in discountItem", discount);
  return (
    <div
      key={discount.id}
      className="w-100 d-flex flex-wrap border border-2 border-primary p-3 rounded-3 mt-3"
    >
      <h3 className="text-center w-100 text-primary">{discount.description}</h3>
        <DiscountModal discount={discount}/>
    </div>
  );
}

export default DiscountItem;
