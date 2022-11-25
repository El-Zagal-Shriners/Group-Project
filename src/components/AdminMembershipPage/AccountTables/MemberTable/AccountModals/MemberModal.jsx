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
import SuccessModal from "./SuccessModal";

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
  // setup state for showing success modals.
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // access use dispatch
  const dispatch = useDispatch();

  // display for dues and dueDate
  const dues = member.dues_paid.split("-")[0];
  const dueDate = member.dues_paid.split("T")[0];

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
    // for success modal
    setShowSuccess(true);
  };

  // changes member's authorization status
  const activate = () => {
    dispatch({
      type: "AUTHORIZE_MEMBER",
      payload: {
        memberId: member.id,
        authorized,
      },
    });
    setAuthorized(member.is_authorized);
    setEdit(false);
    // for success modal
    setShowSuccess(true);
  };

  // updates member's paid date and or number
  const updateMember = () => {
    if (
      memberNumber === member.membership_number &&
      duesPaid === member.dues_paid
    ) {
      activate();
    } else {
      dispatch({
        type: "UPDATE_MEMBER_INFO",
        payload: {
          memberId: member.id,
          memberNumber: memberNumber || member.membership_number,
          duesPaid: duesPaid || member.dues_paid,
        },
      });
      activate();
      resetState();
      // for success modal
      setShowSuccess(true);
    }
  };

  // setup close modal function
  const resetState = () => {
    // reset local state
    setDuesPaid(null);
    setMemberNumber("");
  };

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
                  <p className="text-center fw-bold text-primary m-0 text-decoration-underline">
                    Dues Paid
                  </p>
                  <p className="text-center">{dues}</p>
                </Col>
              </Row>
              <hr />
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
            <Button
              onClick={() => {
                setShow(false);
                setEdit(true);
              }}
            >
              Edit
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
            </Form>
            <Row>
              <Col></Col>
              <Col>
                {authorized ? (
                  <Button onClick={() => setAuthorized(false)}>
                    Deactivate
                  </Button>
                ) : (
                  <Button onClick={() => setAuthorized(true)}>Activate</Button>
                )}
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    setEdit(false);
                    setShowConfirmation(true);
                  }}
                >
                  Remove
                </Button>
              </Col>
              <Col></Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => updateMember()}>Save</Button>
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
          </Modal.Footer>
        </Modal>
        <SuccessModal
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
        <ConfirmationModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          edit={edit}
          setEdit={setEdit}
          setShow={setShow}
          show={show}
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
                  <p>First Name</p>
                  <p>{member.first_name}</p>
                </Col>
                <Col>
                  <p>Last Name</p>
                  <p>{member.last_name}</p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  {member.membership_number ? (
                    <>
                      <p>Member #</p>
                      <p>{member.membership_number}</p>
                    </>
                  ) : (
                    <>
                      <p>Primary</p>
                      <p>{primaryInfo()}</p>
                    </>
                  )}
                </Col>
                <Col>
                  <p>Dues Paid</p>
                  <p>{dues}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={() => {
                      setShow(false);
                      setShowConfirmation(true);
                    }}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
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
        {/* Success Modal to show member was verified. */}
        <SuccessModal
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
      </>
    );
  }
}

export default MemberModal;
