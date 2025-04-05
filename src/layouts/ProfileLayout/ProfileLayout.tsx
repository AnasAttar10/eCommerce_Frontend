import { Row, Col, ListGroup } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <Row className="w-100">
      <Col md={3} className="mb-3">
        <ListGroup>
          <ListGroup.Item as={NavLink} to="" end>
            Account Info
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="orders">
            Orders
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="address">
            Address
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={9}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ProfileLayout;
