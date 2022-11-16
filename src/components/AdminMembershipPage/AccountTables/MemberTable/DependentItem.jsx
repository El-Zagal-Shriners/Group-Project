import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function DependentItem({ dependent }) {
  // add remove function.

  return (
    <ListGroup.Item className="border-0 p-0 w-100">
      <ListGroup horizontal>
        <ListGroup.Item className="col-4 text-center">
          {dependent.first_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-4 text-center">
          {dependent.last_name}
        </ListGroup.Item>
        <ListGroup.Item className="col text-center">
          <Button>Remove</Button>
        </ListGroup.Item>
      </ListGroup>
    </ListGroup.Item>
  );
}

export default DependentItem;
