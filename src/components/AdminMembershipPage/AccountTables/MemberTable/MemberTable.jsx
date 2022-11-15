import MemberItem from "./MemberItem";
import Table from "react-bootstrap/Table";

function MemberTable({ members }) {
  // seperate the members that have membership numbers from the members array.
  const shriners = [...members].filter((acc) => acc.membership_number !== null);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan={6}>Current Members</th>
        </tr>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Member Number</th>
          <th>Dues Paid</th>
          <th>Dependents</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {shriners.map((member) => (
          <MemberItem key={member.id} member={member} members={members} />
        ))}
      </tbody>
    </Table>
  );
}

export default MemberTable;
