import { ListGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ReviewItem from "./ReviewItem";

function ReviewTable({ reviews }) {
  return (
    <div className="vw-100">
      <ListGroup>
        <ListGroup.Item className="p-1">
          <ListGroup horizontal>
            <ListGroup.Item className="col-4 p-0 text-center">
              First Name
            </ListGroup.Item>
            <ListGroup.Item className="col-4 p-0 text-center">
              Last Name
            </ListGroup.Item>
            <ListGroup.Item className="col p-0 text-center">
              Member Number
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ListGroup>
    </div>
  );
}

export default ReviewTable;
