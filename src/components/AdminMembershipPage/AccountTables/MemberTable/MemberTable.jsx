import MemberItem from "./MemberItem";
import { Button, ButtonGroup, Form, ListGroup } from "react-bootstrap";
import "../AccountTables.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function MemberTable({ members }) {
  const accounts = useSelector((store) => store.accounts.accountsReducer);

  // seperate the members that have membership numbers from the members array.
  const primaries = [...accounts].filter(
    (acc) => acc.membership_number !== null
  );
  const newMembers = [...accounts].filter((acc) => acc.is_verified === false);
  const reviewPending = [...accounts].filter(
    (acc) => acc.review_pending === true
  );

  const [filterType, setFilterType] = useState(0);
  const [search, setSearch] = useState("");

  // stops the filter race 🏎️
  const filterArrays = (current, search) => {
    // make copy of the current array.
    let arrCopy = [...current];
    // if filter type is a specific number, filter it accordingly
    switch (filterType) {
      case 0:
        break;
      case 1:
        arrCopy = arrCopy.filter((acc) => acc.review_pending === true);
        break;
      case 2:
        arrCopy = arrCopy.filter((acc) => acc.is_verified === false);
        break;
      default:
        console.log("Error filtering array");
        return;
    }
    // after filtering the array and making a new arrCopy we use this 
    // if statement to filter arrCopy another time base on search.
    if (search === "") {
      return arrCopy;
    } else {
      return arrCopy.filter((member) => {
        if (
          member.last_name.toLowerCase().includes(search.toLowerCase()) ||
          member.first_name
            .toLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          member.membership_number.toString().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
  };

  return (
    <div className="vw-100">
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form.Control
          className="text-center"
          style={{ width: "36%" }}
          placeholder="Search Member"
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonGroup>
          <Button size="sm" onClick={() => setFilterType(0)}>
            All ({primaries.length})
          </Button>
          <Button size="sm" onClick={() => setFilterType(1)}>
            Review ({reviewPending.length})
          </Button>
          <Button size="sm" onClick={() => setFilterType(2)}>
            New ({newMembers.length})
          </Button>
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
          style={{
            overflowY: "scroll",
            height: "72vh",
          }}
        >
          {filterArrays(members, search).map((member) => (
            <MemberItem key={member.id} member={member} members={accounts} />
          ))}
        </div>
      </ListGroup>
    </div>
  );
}

export default MemberTable;
