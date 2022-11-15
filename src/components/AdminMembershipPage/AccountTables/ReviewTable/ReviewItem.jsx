import Button from "react-bootstrap/Button";
import { ListGroup } from "react-bootstrap";

function ReviewItem({ review }) {
    const dues = review.dues_paid.split("-")[0];

  return (
    <ListGroup.Item className="p-1">
      <ListGroup horizontal>
        <ListGroup.Item className="col-2 text-center">
          {review.first_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-2 text-center">
          {review.last_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-3 text-center">
          {review.membership_number}
        </ListGroup.Item>
        <ListGroup.Item className="col-2 text-center">{dues}</ListGroup.Item>
        <ListGroup.Item className="col text-center">
          {/* <Button>Approve</Button>
                <Button>Deny</Button> */}
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  );
}

export default ReviewItem;
