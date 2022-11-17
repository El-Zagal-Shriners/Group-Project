import { useState } from "react";
import { Col, Container, ListGroup, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

function ApprovalItem({ approval }) {
  const dispatch = useDispatch();
  const dues = approval.dues_paid.split("-")[0];
  // setup local state.
  const [show, setShow] = useState(false);
  const [verification, setVerification] = useState(false);

  // used to set the approval status of a member.
  const approveMember = () => {
    console.log(verification);
    console.log(approval.id);
    dispatch({
      type: "APPROVE_MEMBER",
      payload: {
        memberId: approval.id,
        verification: verification,
      },
    });
    setShow(false);
  };

  return (
    <>
      <ListGroup.Item onClick={() => setShow(true)} className="p-1">
        <ListGroup horizontal>
          <ListGroup.Item className="col-4 text-center">
            {approval.first_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-4 text-center">
            {approval.last_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-4 text-center">
            {approval.membership_number}
          </ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
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

        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={6}>
                <p>First Name</p>
                <p>{approval.first_name}</p>
              </Col>
              <Col>
                <p>Last Name</p>
                <p>{approval.last_name}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <p>Member #</p>
                <p>{approval.membership_number}</p>
              </Col>
              <Col>
                <p>Dues Paid</p>
                <p>{dues}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Button onClick={() => setVerification(true)}>Approve</Button>
                {/* <Button onClick={() => approveMember()}>Approve</Button> */}
              </Col>
              <Col>
                <Button onClick={() => setVerification(false)}>Deny</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          {/* make close a cleanup method */}
          <Button onClick={() => setShow(false)}>Close</Button>
          <Button onClick={() => approveMember()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApprovalItem;
