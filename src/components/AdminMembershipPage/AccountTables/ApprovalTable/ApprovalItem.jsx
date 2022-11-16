import { useState } from "react";
import { Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ApprovalItem({ approval }) {
  const dues = approval.dues_paid.split("-")[0];
  // setup local state.
  const [show, setShow] = useState(false);

  return (
    <>
      <ListGroup.Item onClick={() => setShow(true)} className="p-1">
        <ListGroup horizontal>
          <ListGroup.Item className="col-2 text-center">
            {approval.first_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-2 text-center">
            {approval.last_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-3 text-center">
            {approval.membership_number}
          </ListGroup.Item>
          <ListGroup.Item className="col-2 text-center">{dues}</ListGroup.Item>
          <ListGroup.Item className="col text-center">
            {/* <Button>Approve</Button>
                  <Button>Deny</Button> */}
          </ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      <Modal 
        show={show}
        onHide={()=> setShow(false)}
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
              <Col>
                  <p>{approval.first_name}</p>
              </Col>
              <Col>
                  {approval.last_name}
              </Col>
            </Row>
          </Container>
          <Form>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {/* make close a cleanup method */}
          <Button onClick={()=> setShow(false)}>Close</Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApprovalItem;
