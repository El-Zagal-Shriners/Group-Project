import MemberItem from "./MemberItem";
import { Form, ListGroup } from "react-bootstrap";
import "../AccountTables.css";
import { useState } from "react";

function MemberTable({ members }) {
  // seperate the members that have membership numbers from the members array.
  const shriners = [...members].filter((acc) => acc.membership_number !== null);
  // const [filterShriners, setFilterShriners] = useState([...shriners]);
  const [search, setSearch] = useState("");

  return (
    <div className="vw-100">
      <div>
        <Form.Control
          className="w-50"
          placeholder="Search Member"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ListGroup>
        <ListGroup.Item className="p-1">
          <ListGroup horizontal>
            <ListGroup.Item className="col-4 p-0 text-center">
              First Name
            </ListGroup.Item>
            <ListGroup.Item className="col-4 p-0 text-center">
              Last Name
            </ListGroup.Item>
            <ListGroup.Item className="col p-0 text-center">
              Member Number
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
        <div
          className="member-table"
          style={{ height: "23vh", overflowY: "scroll" }}
        >
          {shriners
            .filter((member) => {
              if (search === "") {
                return member;
              } else if (
                member.last_name.toLowerCase().includes(search.toLowerCase()) ||
                member.first_name
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                member.membership_number.toString().includes(search)
              ) {
                return member;
              }
            })
            .map((member) => (
              <MemberItem key={member.id} member={member} members={members} />
            ))}
        </div>
      </ListGroup>
    </div>
  );
}

export default MemberTable;
