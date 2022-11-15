import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ApprovalItem({ approval }) {
  const dues = approval.dues_paid.split("-")[0];

  return (
    <ListGroup.Item className="p-1">
      <ListGroup horizontal>
        <ListGroup.Item className="col-2 text-center">
          {approval.first_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-2 text-center">
          {approval.last_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-3 text-center">
          {approval.membership_number}
        </ListGroup.Item>
        <ListGroup.Item className="col-2 text-center">{dues}</ListGroup.Item>
        <ListGroup.Item className="col text-center">
          {/* <Button>Approve</Button>
                <Button>Deny</Button> */}
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  );
}

export default ApprovalItem;
