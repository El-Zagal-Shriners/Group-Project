import Card from "react-bootstrap/Card";

function AdminTrackingList({ arrayList, allVendors, currentSelected }) {
  return arrayList.map((discount) => (
    <div
      key={discount.id}
      className="w-100 bg-primary d-flex flex-wrap border border-2 border-primary px-3 py-2 rounded-3 mt-3"
    >
      {currentSelected === "default" && (
        <h3 className="text-center w-100 text-light fw-bold">
          {
            allVendors[
              allVendors.findIndex(
                (item) => Number(item.id) === Number(discount.vendor_id)
              )
            ]?.name
          }
        </h3>
      )}
      <div className="bg-light w-100 rounded mb-1 p-2">
        <h5 className="text-center w-100 fw-bold text-primary">
          {discount.discount_summary}
        </h5>
        <h5 className="text-center w-100 text-primary">
          {discount.discount_description}
        </h5>
      </div>
      <Card className="col-6 me-1 mb-1">
        <Card.Body>
          <Card.Title className="text-center">Past 7 Days</Card.Title>
          <Card.Text className="text-center">
            {discount.seven_day_count}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="col mb-1">
        <Card.Body>
          <Card.Title className="text-center">Past Month</Card.Title>
          <Card.Text className="text-center">
            {discount.thirty_day_count}
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="col-6 mb-1 me-1">
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
  ));
}

export default AdminTrackingList;
