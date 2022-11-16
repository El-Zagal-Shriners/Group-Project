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
import DependentItem from "./DependentItem";

function MemberItem({ member, members }) {
  const dues = member.dues_paid.split("-")[0];
  const dueDate = member.dues_paid.split("T")[0];
  // setup local state for showing dependents.
  const [listDependents, toggleList] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  // local state for form.
  const [memberNumber, setMemberNumber] = useState('');
  const [duesPaid, setDuesPaid] = useState(null);
  // assume member is authorized.
  const [authorized, setAuthorized] = useState(true);

  // setup close modal function
  const closeModal = () => {
    // reset local state
    setAuthorized(true);
    setDuesPaid(null);
    setMemberNumber('');
  };

  // access members to get the dependents.
  const dependents = [...members].filter(
    (acc) =>
      acc.membership_number === null &&
      Number(acc.primary_member_id) === member.id
  );

  return (
    <>
      <ListGroup.Item onClick={() => setShow(true)} className="p-1">
        <ListGroup horizontal>
          <ListGroup.Item className="col-4 text-center">
            {member.first_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-4 text-center">
            {member.last_name}
          </ListGroup.Item>
          <ListGroup.Item className="col text-center">
            {member.membership_number}
          </ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      {/* info modal */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          closeModal();
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
          <ListGroup horizontal>
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
            }}
          >
            Close
          </Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal */}
      <Modal
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
              <Button onClick={() => setAuthorized(true)}>Activate</Button>
            </Col>
            <Col>
              <Button onClick={() => setAuthorized(false)}>Deactivate</Button>
            </Col>
            <Col>
              {/* add delete function */}
              <Button>Remove</Button>
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
            }}
          >
            Close
          </Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberItem;
