import MemberItem from "./MemberItem";
import Table from "react-bootstrap/Table";
import { ListGroup } from "react-bootstrap";

function MemberTable({ members }) {
  // seperate the members that have membership numbers from the members array.
  const shriners = [...members].filter((acc) => acc.membership_number !== null);

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
              Dependents
            </ListGroup.Item>
            {/* <ListGroup.Item className="col p-0 text-center">
              Options
            </ListGroup.Item> */}
          </ListGroup>
        </ListGroup.Item>
        {shriners.map((member) => (
          <MemberItem key={member.id} member={member} members={members} />
        ))}
      </ListGroup>
    </div>
    // <Table striped bordered hover variant="dark">
    //   <thead>
    //     <tr>
    //       <th colSpan={6}>Current Members</th>
    //     </tr>
    //     <tr>
    //       <th>First Name</th>
    //       <th>Last Name</th>
    //       <th>Member Number</th>
    //       <th>Dues Paid</th>
    //       <th>Dependents</th>
    //       <th>Options</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {shriners.map((member) => (
    //       <MemberItem key={member.id} member={member} members={members} />
    //     ))}
    //   </tbody>
    // </Table>
  );
}

export default MemberTable;
