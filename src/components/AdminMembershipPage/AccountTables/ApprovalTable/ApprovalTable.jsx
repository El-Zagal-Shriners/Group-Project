import Table from "react-bootstrap/Table";
import ApprovalItem from "./ApprovalItem";

function ApprovalTable({ approvals }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan={5}>New Members</th>
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
        {approvals.map((approval) => (
          <ApprovalItem key={approval.id} approval={approval} />
        ))}
      </tbody>
    </Table>
  );
}

export default ApprovalTable;
