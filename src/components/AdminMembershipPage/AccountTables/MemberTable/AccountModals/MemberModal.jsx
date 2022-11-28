import { useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DependentItem from "../DependentItem";
import ConfirmationModal from "./ConfirmationModal";

function MemberModal({ member, show, setShow }) {
  const accounts = useSelector((store) => store.accounts.accountsReducer);
  // access members to get the dependents.
  // dependents are accounts that have a null membership number and
  // the pimary member id field matches the id of an existing member.
  const dependents = [...accounts].filter(
    (acc) =>
      acc.membership_number === null &&
      Number(acc.primary_member_id) === member.id
  );

  // function to get the current dependent's primary's account info.
  const primaryInfo = () => {
    if (member.membership_number === null) {
      const primary = accounts.find((acc) => {
        return acc.id === Number(member.primary_member_id);
      });
      const primaryName = `${primary.first_name} ${primary.last_name}`;
      return primaryName;
    }
  };

  // setup local state.
  const [memberNumber, setMemberNumber] = useState("");
  const [duesPaid, setDuesPaid] = useState(null);
  const [listDependents, toggleList] = useState(false);
  const [edit, setEdit] = useState(false);
  const [authorized, setAuthorized] = useState(member.is_authorized);
  // setup state for showing confirmation modal.
  const [showConfirmation, setShowConfirmation] = useState(false);

  // access use dispatch
  const dispatch = useDispatch();

  // display for dues and dueDate
  const dues = member.membership_number ? member.dues_paid.split("-")[0] : "";
  const dueDate = member.membership_number
    ? member.dues_paid.split("T")[0]
    : "";

  // used to set the approval status of a member.
  const approveMember = () => {
    dispatch({
      type: "APPROVE_MEMBER",
      payload: {
        memberId: member.id,
        verification: true,
      },
    });
    setShow(false);
  };

  // changes member's authorization status
  const activate = () => {
    dispatch({
      type: "AUTHORIZE_MEMBER",
      payload: {
        memberId: member.id,
        authorized: !member.is_authorized,
      },
    });
    setAuthorized(!member.is_authorized);
    setShow(false);
  };

  // updates member's paid date and or number
  const updateMember = () => {
    if (
      memberNumber === member.membership_number &&
      duesPaid === member.dues_paid
    ) {
    } else {
      dispatch({
        type: "UPDATE_MEMBER_INFO",
        payload: {
          memberId: member.id,
          memberNumber: memberNumber || member.membership_number,
          duesPaid: duesPaid || member.dues_paid,
        },
      });
      resetState();
    }
  };

  // setup close modal function
  const resetState = () => {
    // reset local state
    setDuesPaid(null);
    setMemberNumber("");
    setAuthorized(member.is_authorized);
  };

  // this function will return the classnames
  // needed for displaying the current member status
  function inactiveOrExpired() {
    if (member.is_authorized) {
      return `text-success fw-bold text-center`;
    } else {
      return `text-danger fw-bold text-center`;
    }
  }

  function handleAdmin(level) {
    dispatch({ type: "TOGGLE_ADMIN", payload: { level, member: member.id } });
  }

  // conditionally render the modal displayed depending on if the
  // user is verified or not.
  if (member.is_verified) {
    return (
      <>
        <Modal
          // info modal
          show={show}
          onHide={() => {
            setShow(false);
            resetState();
            toggleList(false);
          }}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="bg-primary text-light">
            <Modal.Title className="fw-bold">Member Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <h6 className={inactiveOrExpired()}>
              Status: {member.is_authorized ? "Active" : "Inactive"}
            </h6>
            <Container>
              <Row>
                <Col xs={6}>
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    First Name
                  </p>
                  <p className="text-center">{member.first_name}</p>
                </Col>
                <Col>
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    Last Name
                  </p>
                  <p className="text-center">{member.last_name}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    {member.membership_number ? "Member #" : "Primary"}
                  </p>
                  <p className="text-center">
                    {member.membership_number
                      ? member.membership_number
                      : primaryInfo()}
                  </p>
                </Col>
                <Col>
                  {member.dues_paid && member.membership_number && (
                    <>
                      <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                        Dues Paid
                      </p>
                      <p className="text-center">{dues}</p>
                    </>
                  )}
                </Col>
              </Row>
              {member.membership_number && <hr />}
              {member.membership_number && (
                <Row>
                  <Col>
                    <p className="text-center fw-bold text-primary m-0 pt-2">
                      Dependents: {dependents.length}
                    </p>
                  </Col>
                  <Col>
                    {dependents.length > 0 && (
                      <Button
                        variant="outline-primary"
                        onClick={() => toggleList(!listDependents)}
                      >
                        List
                      </Button>
                    )}
                  </Col>
                </Row>
              )}
            </Container>
            <ListGroup className="p-1 d-flex">
              {listDependents &&
                dependents.map((dependent) => (
                  <DependentItem
                    key={dependent.id}
                    dependent={dependent}
                    show={show}
                    setShow={setShow}
                    setEdit={setEdit}
                    edit={edit}
                    setShowConfirmation={setShowConfirmation}
                    showConfirmation={showConfirmation}
                  />
                ))}
            </ListGroup>
          </Modal.Body>

          <Modal.Footer>
            {member.membership_number ? (
              <Button
                onClick={() => {
                  setShow(false);
                  setEdit(true);
                }}
              >
                Edit
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShow(false);
                  setShowConfirmation(true);
                }}
              >
                Remove
              </Button>
            )}
            <Button onClick={() => activate()}>
              {authorized ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                setShow(false);
                resetState();
                toggleList(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          // edit modal
          backdrop="static"
          show={edit}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="bg-primary text-light">
            <Modal.Title>Edit Member</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <FloatingLabel label={member.membership_number}>
                <Form.Control
                  type="number"
                  onChange={(evt) => setMemberNumber(evt.target.value)}
                ></Form.Control>
              </FloatingLabel>
              <FloatingLabel
                label={dueDate} // maybe format this to mm/dd/yyyy
              >
                <Form.Control
                  type="date"
                  onChange={(evt) => setDuesPaid(evt.target.value)}
                ></Form.Control>
              </FloatingLabel>
              <div className="d-flex justify-content-between">
                <span className="ps-3 pt-2">Admin Access? </span>
                {member.admin_level === 4 ? (
                  <>
                    <span className="pt-2 fw-bold text-success">Yes</span>
                    <Button onClick={() => handleAdmin(0)}>Remove Admin</Button>
                  </>
                ) : (
                  <>
                    <span className="pt-2 fw-bold text-danger">No</span>
                    <Button onClick={() => handleAdmin(4)}>Add Admin</Button>
                  </>
                )}
              </div>
            </Form>
          </Modal.Body>

          <Modal.Footer className="w-100 d-flex">
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="w-100 d-flex justify-content-between">
                <Button
                  onClick={() => {
                    setEdit(false);
                    setShowConfirmation(true);
                  }}
                >
                  Remove
                </Button>
                <div>
                  <Button className="mx-2" onClick={() => updateMember()}>
                    Save
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setEdit(false);
                      resetState();
                      setShow(true);
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
        <ConfirmationModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          edit={edit}
          setEdit={setEdit}
          setShow={setShow}
          show={true}
          member={member}
        />
      </>
    );
  } else {
    return (
      <>
        {/* Verify Modal / New Member Modal */}
        <Modal
          show={show}
          onHide={() => setShow(false)}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="bg-primary text-light">
            <Modal.Title>New Member Info</Modal.Title>
          </Modal.Header>

          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col xs={6}>
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    First Name
                  </p>
                  <p className="text-center">{member.first_name}</p>
                </Col>
                <Col>
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    Last Name
                  </p>
                  <p className="text-center">{member.last_name}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  {member.membership_number ? (
                    <>
                      <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                        Member #
                      </p>
                      <p className="text-center">{member.membership_number}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                        Primary
                      </p>
                      <p className="text-center">{primaryInfo()}</p>
                    </>
                  )}
                </Col>
                <Col>
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    Dues Paid
                  </p>
                  <p className="text-center">{dues}</p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button
              onClick={() => {
                setShow(false);
                setShowConfirmation(true);
              }}
            >
              Remove
            </Button>
            <Button onClick={() => approveMember()}>Approve</Button>
            <Button variant="outline-primary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <ConfirmationModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          setShow={setShow}
          show={show}
          edit={edit}
          setEdit={setEdit}
          member={member}
        />
      </>
    );
  }
}

export default MemberModal;
