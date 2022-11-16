import MemberItem from "./MemberItem";
import { ListGroup } from "react-bootstrap";

function MemberTable({ members }) {
  // seperate the members that have membership numbers from the members array.
  const shriners = [...members].filter((acc) => acc.membership_number !== null);

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
        {shriners.map((member) => (
          <MemberItem key={member.id} member={member} members={members} />
        ))}
      </ListGroup>
    </div>
  );
}

export default MemberTable;
