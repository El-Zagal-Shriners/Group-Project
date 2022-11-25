import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ConfirmationModal from "./AccountModals/ConfirmationModal";

function DependentItem({ dependent, setShow, setEdit }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <ListGroup.Item className="px-1 d-flex">
        <div className="col-4 text-center m-0 pt-1">{dependent.first_name}</div>
        <div className="col-4 text-center pt-1">{dependent.last_name}</div>
        <div className="col text-center">
          <Button
            size="sm"
            onClick={() => {
              setShowConfirmation(true);
            }}
          >
            Remove
          </Button>
        </div>
      </ListGroup.Item>
      <ConfirmationModal
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        member={dependent}
        setEdit={setEdit}
        edit={true}
        setShow={setShow}
        show={true}
      />
    </>
  );
}

export default DependentItem;
