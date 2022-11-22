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
import { useDispatch } from "react-redux";
import DependentItem from "../DependentItem";
import SuccessModal from "./SuccessModal";

function MemberModal({ member, members, show, setShow }) {
  // access members to get the dependents.
  const dependents = [...members].filter(
    (acc) =>
      acc.membership_number === null &&
      Number(acc.primary_member_id) === member.id
  );

  //   setup local state.
  const [memberNumber, setMemberNumber] = useState("");
  const [duesPaid, setDuesPaid] = useState(null);
  const [listDependents, toggleList] = useState(false);
  const [edit, setEdit] = useState(false);
  const [authorized, setAuthorized] = useState(member.is_authorized);
  // setup state for showing success modals.
  const [showSuccess, setShowSuccess] = useState(false);

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
      closeModal();
      // for success modal
      setShowSuccess(true);
    }
  };

  // deletes member
  const removeMember = () => {
    // console.log(member.id);
    dispatch({
      type: "ADMIN_DELETE_MEMBER",
      payload: {
        memberId: member.id,
      },
    });
  };

  // setup close modal function
  const closeModal = () => {
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
            closeModal();
            toggleList(false);
          }}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Member Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>
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
                  <p>Member #</p>
                  <p>{member.membership_number}</p>
                </Col>
                <Col>
                  <p>Dues Paid</p>
                  <p>{dues}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Dependents: {dependents.length}</p>
                </Col>
                <Col>
                  {dependents.length > 0 && (
                    <Button onClick={() => toggleList(!listDependents)}>
                      List
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
            <ListGroup>
              {listDependents &&
                dependents.map((dependent) => (
                  <DependentItem key={dependent.id} dependent={dependent} />
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
              onClick={() => {
                setShow(false);
                closeModal();
                toggleList(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          // edit modal
          show={edit}
          onHide={() => {
            setEdit(false);
            closeModal();
          }}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
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
                <Button onClick={() => removeMember()}>Remove</Button>
              </Col>
              <Col></Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button
              onClick={() => {
                setEdit(false);
                setShow(true);
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                setEdit(false);
                closeModal();
                toggleList(false);
              }}
            >
              Close
            </Button>
            <Button onClick={() => updateMember()}>Save</Button>
          </Modal.Footer>
        </Modal>
        <SuccessModal
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        ></SuccessModal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          // verify modal
          show={show}
          onHide={() => setShow(false)}
          animation={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
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
                  <p>Member #</p>
                  <p>{member.membership_number}</p>
                </Col>
                <Col>
                  <p>Dues Paid</p>
                  <p>{dues}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={() => removeMember()}>Remove</Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => approveMember()}>Approve</Button>
            <Button onClick={() => setShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
        <SuccessModal
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        ></SuccessModal>
      </>
    );
  }
}

export default MemberModal;
