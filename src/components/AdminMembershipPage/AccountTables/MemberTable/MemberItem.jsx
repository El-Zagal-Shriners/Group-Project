import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DependentItem from "./DependentItem";

function MemberItem({ member, members }) {
  const dues = member.dues_paid.split("-")[0];
  // setup local state for showing dependents.
  const [listDependents, toggleList] = useState(false);
  // access members to get the dependents.
  const dependents = [...members].filter(
    (acc) =>
      acc.membership_number === null &&
      Number(acc.primary_member_id) === member.id
  );

  return (
    <ListGroup.Item className="p-1">
      <ListGroup horizontal>
        <ListGroup.Item className="col-2 text-center">
          {member.first_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-2 text-center">
          {member.last_name}
        </ListGroup.Item>
        <ListGroup.Item className="col-3 text-center">
          {member.membership_number}
        </ListGroup.Item>
        <ListGroup.Item className="col-2 text-center">{dues}</ListGroup.Item>
        <ListGroup.Item
          onClick={() => toggleList(!listDependents)}
          className="col text-center"
        >
          {dependents.length}
        </ListGroup.Item>
      </ListGroup>
      <ListGroup horizontal>
        {listDependents &&
          dependents.map((dependent) => (
            <DependentItem key={dependent.id} dependent={dependent}/>
          ))}
      </ListGroup>
    </ListGroup.Item>
  );
}

export default MemberItem;
