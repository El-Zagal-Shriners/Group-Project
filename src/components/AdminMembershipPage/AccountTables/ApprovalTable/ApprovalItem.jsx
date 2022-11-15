import Button from "react-bootstrap/Button";

function ApprovalItem({ approval }) {
  return (
    <tr>
      <td>{approval.first_name}</td>
      <td>{approval.last_name}</td>
      <td>{approval.membership_number}</td>
      <td>{approval.dues_paid}</td>
      <td>
        <Button>Approve</Button>
        <Button>Deny</Button>
      </td>
    </tr>
  );
}

export default ApprovalItem;
