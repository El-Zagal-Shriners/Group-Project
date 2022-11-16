import { useState } from "react";
import { Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DependentItem from "./DependentItem";

function MemberItem({ member, members }) {
  const dues = member.dues_paid.split("-")[0];
  // setup local state for showing dependents.
  const [listDependents, toggleList] = useState(false);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
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
        onHide={() => setShow(false)}
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
                <Button onClick={() => toggleList(!listDependents)}>
                  List
                </Button>
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
          <Button onClick={() => setShow(false)}>Close</Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
      {/* edit modal */}
      <Modal
        show={edit}
        onHide={() => setEdit(false)}
        animation={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            onClick={() => {
              setEdit(false);
              setShow(true);
            }}
          >
            Back
          </Button>
          <Button onClick={() => setEdit(false)}>Close</Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MemberItem;
