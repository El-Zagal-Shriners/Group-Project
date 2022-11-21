import ListGroup from "react-bootstrap/ListGroup";
import ApprovalItem from "./ApprovalItem";
import "../AccountTables.css";

function ApprovalTable({ approvals }) {
  return (
    <div className="w-100">
      <p>New Members</p>
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
          {approvals.map((approval) => (
            <ApprovalItem key={approval.id} approval={approval} />
          ))}
        </div>
      </ListGroup>
    </div>
  );
}

export default ApprovalTable;
