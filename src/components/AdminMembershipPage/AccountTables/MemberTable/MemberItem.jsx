import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import MemberModal from "./AccountModals/MemberModal";

function MemberItem({ member, filterType }) {
  // setup state for displaying modals.
  const [show, setShow] = useState(false);

  // setup conditional render for class name.
  const classVariant = () => {
    if (member.is_authorized === false && filterType === 0) {
      return "px-1 mb-1 d-flex bg-danger text-light";
    } else {
      return "px-1 mb-1 d-flex";
    }
  };

  return (
    <>
      <ListGroup.Item onClick={() => setShow(true)} className={classVariant()}>
        <div className="col-4 text-center m-0">{member.first_name}</div>
        <div className="col-4 text-center m-0">{member.last_name}</div>
        <div className="col text-center m-0">
          {member.membership_number ? member.membership_number : "Dependent"}
        </div>
      </ListGroup.Item>
      <MemberModal member={member} show={show} setShow={setShow} />
    </>
  );
}

export default MemberItem;
