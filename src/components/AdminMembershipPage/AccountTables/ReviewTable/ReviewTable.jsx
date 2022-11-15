import Table from "react-bootstrap/Table";
import ReviewItem from "./ReviewItem";

function ReviewTable({ reviews }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan={5}>Review Needed</th>
        </tr>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Member Number</th>
          <th>Dues Paid</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </tbody>
    </Table>
  );
}

export default ReviewTable;
