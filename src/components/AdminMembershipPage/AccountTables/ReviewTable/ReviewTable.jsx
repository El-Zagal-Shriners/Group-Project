import { ListGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ReviewItem from "./ReviewItem";

function ReviewTable({ reviews }) {
  return (
    <div className="vw-100">
      <ListGroup>
        <ListGroup.Item className="p-1">
          <ListGroup horizontal>
            <ListGroup.Item className="col-2 p-0 text-center">
              First Name
            </ListGroup.Item>
            <ListGroup.Item className="col-2 p-0 text-center">
              Last Name
            </ListGroup.Item>
            <ListGroup.Item className="col-3 p-0 text-center">
              Member Number
            </ListGroup.Item>
            <ListGroup.Item className="col-2 p-0 text-center">
              Dues Paid
            </ListGroup.Item>
            <ListGroup.Item className="col p-0 text-center">
              Options
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ListGroup>
    </div>
    // <Table striped bordered hover variant="dark">
    //   <thead>
    //     <tr>
    //       <th colSpan={5}>Review Needed</th>
    //     </tr>
    //     <tr>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Member Number</th>
    //       <th>Dues Paid</th>
    //       <th>Options</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {reviews.map((review) => (
    //       <ReviewItem key={review.id} review={review} />
    //     ))}
    //   </tbody>
    // </Table>
  );
}

export default ReviewTable;
