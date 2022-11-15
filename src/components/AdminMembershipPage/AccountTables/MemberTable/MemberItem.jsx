import { useState } from "react";
import Button from "react-bootstrap/Button";

function MemberItem({ member, members }) {
  // setup local state for showing dependents.
  const [listDependents, toggleList] = useState(false);
  // access members to get the dependents.
  const dependents = [...members].filter(
    (acc) =>
      acc.membership_number === null &&
      Number(acc.primary_member_id) === member.id
  );

  return (
    <>
      <tr>
        <td>{member.first_name}</td>
        <td>{member.last_name}</td>
        <td>{member.membership_number}</td>
        <td>{member.dues_paid}</td>
        <td>
          {dependents.length}
          {dependents.length > 0 ? (
            <Button onClick={() => toggleList(!listDependents)}>List</Button>
          ) : (
            <></>
          )}
        </td>
        <td>
          <Button>Activate</Button>
          <Button>Deactivate</Button>
        </td>
      </tr>
      {listDependents &&
        dependents.map((dependent) => (
          <tr>
            <td>{dependent.first_name}</td>
            <td>{dependent.last_name}</td>
            <td>{dependent.membership_number}</td>
            <td>{dependent.dues_paid}</td>
            <td></td>
            <td></td>
          </tr>
        ))}
    </>
  );
}

export default MemberItem;
