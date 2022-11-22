import MemberItem from "./MemberItem";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

function MemberTable({ members }) {
  const accounts = useSelector((store) => store.accounts.accountsReducer);

  // seperate the members that have membership numbers from the members array.
  const primaries = [...accounts].filter(
    (acc) => acc.membership_number !== null && acc.is_verified === true
  );
  const newMembers = [...accounts].filter(
    (acc) => acc.is_verified === false && acc.membership_number !== null
  );
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
        arrCopy = arrCopy.filter((acc) => acc.is_verified === true);
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
    <div className="d-flex justify-content-center">
      <div className="col col-lg-6 d-flex flex-column align-items-center justify-content-center">
        <div className="w-100 d-flex align-items-center justify-content-between">
          <Form.Control
            className="text-center"
            style={{ width: "36%" }}
            placeholder="Search Member"
            onChange={(e) => setSearch(e.target.value)}
          />
          <ButtonGroup className="me-1">
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
        <ListGroup className="w-100 px-1 col col-lg-6">
          <ListGroup.Item className="p-1 bg-primary d-flex">
            <div className="col-4 p-0 text-center bg-primary text-light fw-bold">
              First Name
            </div>
            <div className="col-4 p-0 text-center bg-primary text-light fw-bold">
              Last Name
            </div>
            <div className="col p-0 text-center bg-primary text-light fw-bold">
              Member ID
            </div>
          </ListGroup.Item>
          <div
            className="member-table px-1 bg-primary"
            style={{
              overflowY: "scroll",
              maxHeight: "72vh",
            }}
          >
            {filterArrays(members, search).map((member) => (
              <MemberItem key={member.id} member={member} members={accounts} />
            ))}
          </div>
        </ListGroup>
      </div>
    </div>
  );
}

export default MemberTable;
