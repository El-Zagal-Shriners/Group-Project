import MemberItem from "./MemberItem";
import { Button, ButtonGroup, Form, ListGroup } from "react-bootstrap";
import "../AccountTables.css";
import { useState } from "react";

function MemberTable({ members }) {
  // seperate the members that have membership numbers from the members array.
  const primaries = [...members].filter((acc) => acc.membership_number !== null);
  const newMembers = [...members].filter(acc => acc.is_verified === false);
  const reviewPending = [...members].filter(acc => acc.review_pending === true);
  // let currentMembers = primaries;
  const [currentMembers, setCurrentMembers] = useState(primaries);
  // const [filterShriners, setFilterShriners] = useState([...primaries]);
  const [search, setSearch] = useState("");



  return (
    <div className="vw-100">
      <div 
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Form.Control
          className="text-center"
          style={{width: "36%"}}
          placeholder="Search Member"
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonGroup>
          <Button size="sm" onClick={() => setCurrentMembers(primaries)}>All ({primaries.length})</Button>
          <Button size="sm" onClick={() => setCurrentMembers(reviewPending)}>Review ({reviewPending.length})</Button>
          <Button size="sm" onClick={() => setCurrentMembers(newMembers)}>New ({newMembers.length})</Button>
        </ButtonGroup>
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
          // height: "23vh"
          style={{
            overflowY: "scroll",
            height: "72vh",
          }}
        >
          {currentMembers
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
