import Button from "react-bootstrap/Button";

function ReviewItem({ review }) {
  return (
    <tr>
      <td>{review.first_name}</td>
      <td>{review.last_name}</td>
      <td>{review.membership_number}</td>
      <td>{review.dues_paid}</td>
      <td>
        <Button>Approve</Button>
        <Button>Deny</Button>
      </td>
    </tr>
  );
}

export default ReviewItem;
