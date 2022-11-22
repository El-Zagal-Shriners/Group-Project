import { useSelector } from "react-redux";
import DiscountModal from "./DiscountModal";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './DiscountItem.css';

function DiscountItem({ discount }) {
  const vendors = useSelector((store) => store.vendors);
  const vendor = vendors.find((vend) => vend.id === Number(discount.vendor_id));

  return (
    <>
    <Card
    key={discount.id}
    className="w-100 d-flex flex-wrap border border-2 border-primary p-3 rounded-3 mt-3">
      <Card.Header className=" vendor text-center w-100 text-primary border border-2 p-3 mt-3 border-primary ">
        {vendor?.name}
        </Card.Header>
      <Card.Body>
        <Card.Title  className="text-center w-100 text-primary">
        {discount.discount_description}
        </Card.Title>
        <Card.Text className="text-center w-100 text-primary">
        {discount.discount_summary}
        </Card.Text>
        <div className="text-center w-100 text-primary">
      <DiscountModal discount={discount}/>
      </div>
      </Card.Body>
      </Card>
    </>
  );
}

export default DiscountItem;
