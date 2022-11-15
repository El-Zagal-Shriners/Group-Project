import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import ApprovalItem from "./ApprovalItem";
import { Col } from "react-bootstrap";

function ApprovalTable({ approvals }) {
  return (
    <div className="w-100">
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
        {approvals.map((approval) => (
          <ApprovalItem key={approval.id} approval={approval} />
        ))}
      </ListGroup>
    </div>
  );
}

export default ApprovalTable;
