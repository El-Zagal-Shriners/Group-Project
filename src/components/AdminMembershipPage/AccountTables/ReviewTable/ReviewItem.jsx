import Button from "react-bootstrap/Button";
import { Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { useState } from "react";

function ReviewItem({ review }) {
  const dues = review.dues_paid.split("-")[0];
  // setup local state
  const [show, setShow] = useState(false);

  return (
    <>
      <ListGroup.Item onClick={() => setShow(true)} className="p-1">
        <ListGroup horizontal>
          <ListGroup.Item className="col-4 text-center">
            {review.first_name}
          </ListGroup.Item>
          <ListGroup.Item className="col-4 text-center">
            {review.last_name}
          </ListGroup.Item>
          <ListGroup.Item className="col text-center">
            {review.membership_number}
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
                <p>{review.first_name}</p>
              </Col>
              <Col>
                <p>Last Name</p>
                <p>{review.last_name}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <p>Member #</p>
                <p>{review.membership_number}</p>
              </Col>
              <Col>
                <p>Dues Paid</p>
                <p>{dues}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Button>Activate</Button>
              </Col>
              <Col>
                <Button>Deactive</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          {/* make close modal a cleanup method */}
          <Button onClick={() => setShow(false)}>Close</Button>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewItem;
