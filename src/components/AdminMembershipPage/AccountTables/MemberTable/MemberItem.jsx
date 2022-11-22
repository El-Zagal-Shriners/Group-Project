import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import MemberModal from "./AccountModals/MemberModal";

function MemberItem({ member, members }) {
  // setup state for displaying modals.
  const [show, setShow] = useState(false);

  return (
    <>
      <ListGroup.Item
        onClick={() => setShow(true)}
        className="px-1 mb-1 d-flex"
      >
        <div className="col-4 text-center m-0">{member.first_name}</div>
        <div className="col-4 text-center m-0">{member.last_name}</div>
        <div className="col text-center m-0">{member.membership_number}</div>
      </ListGroup.Item>
      <MemberModal
        member={member}
        members={members}
        show={show}
        setShow={setShow}
      />
    </>
  );
}

export default MemberItem;
