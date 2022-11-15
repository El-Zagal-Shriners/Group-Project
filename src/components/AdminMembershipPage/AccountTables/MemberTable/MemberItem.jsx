import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
            <>
              <ListGroup.Item className="col-2 text-center">
                {dependent.first_name}
              </ListGroup.Item>
              <ListGroup.Item className="col-2 text-center">
                {dependent.last_name}
              </ListGroup.Item>
              <ListGroup.Item className="col-3 text-center">
                {dependent.membership_number}
              </ListGroup.Item>
              <ListGroup.Item className="col-2 text-center">
                {dues}
              </ListGroup.Item>
              <ListGroup.Item className="col"></ListGroup.Item>
            </>
          ))}
      </ListGroup>
    </ListGroup.Item>
    // <>
    //   <tr>
    //     <td>{member.first_name}</td>
    //     <td>{member.last_name}</td>
    //     <td>{member.membership_number}</td>
    //     <td>{member.dues_paid}</td>
    //     <td>
    //       {dependents.length}
    //       {dependents.length > 0 ? (
    //         <Button onClick={() => toggleList(!listDependents)}>List</Button>
    //       ) : (
    //         <></>
    //       )}
    //     </td>
    //     <td>
    //       <Button>Activate</Button>
    //       <Button>Deactivate</Button>
    //     </td>
    //   </tr>
    //   {listDependents &&
    //     dependents.map((dependent) => (
    //       <tr>
    //         <td>{dependent.first_name}</td>
    //         <td>{dependent.last_name}</td>
    //         <td>{dependent.membership_number}</td>
    //         <td>{dependent.dues_paid}</td>
    //         <td></td>
    //         <td></td>
    //       </tr>
    //     ))}
    // </>
  );
}

export default MemberItem;
