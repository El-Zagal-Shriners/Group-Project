import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ConfirmationModal from "./AccountModals/ConfirmationModal";

function DependentItem({ dependent }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <ListGroup.Item className="border-0 p-0 w-100">
        <ListGroup horizontal>
          <ListGroup.Item className="col-4 text-center">
            {dependent.first_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-4 text-center">
            {dependent.last_name}
          </ListGroup.Item>
          <ListGroup.Item className="col text-center">
            <Button onClick={() => setShow(true)}>Remove</Button>
          </ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      <ConfirmationModal
        show={show}
        setShow={setShow}
        memberId={dependent.id}
      />
    </>
  );
}

export default DependentItem;
