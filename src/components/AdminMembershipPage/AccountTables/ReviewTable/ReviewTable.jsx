import { ListGroup } from "react-bootstrap";
import ReviewItem from "./ReviewItem";
import "../AccountTables.css";

function ReviewTable({ reviews }) {
  return (
    <div className="vw-100">
      <p>Pending Review</p>
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
        <div
          className="member-table"
          style={{ overflowY: "scroll", height: "15vh" }}
        >
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      </ListGroup>
    </div>
  );
}

export default ReviewTable;
