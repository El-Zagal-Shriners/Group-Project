function DiscountCard({thisDiscount}) {
  return (
    <div className="bg-secondary rounded  m-1">
      <div className="p-3">
        <span className="bg-light m-1 rounded p-2 ">{thisDiscount.description}, {thisDiscount.vendor_name}</span>
        <span className="bg-light m-1 rounded p-2">{thisDiscount.category_name}</span>
      </div>
    </div>
  );
}

export default DiscountCard;
