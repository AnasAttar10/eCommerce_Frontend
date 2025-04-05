import { Col, ListGroup, Row } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import {
  FaShoppingCart, // Orders
  FaShoppingBag, // Products
  FaThLarge, // Categories
  FaTag, // Brands
  FaTh, // Sub Categories
  FaTicketAlt, // Coupons
} from 'react-icons/fa';

const AdminLayout = () => {
  return (
    <Row className="w-100">
      <Col md={3} className="mb-3">
        <ListGroup>
          <ListGroup.Item as={NavLink} to="/admin" end>
            <FaShoppingCart size={20} /> Orders
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/admin/all-products">
            <FaShoppingBag size={20} /> Products
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/admin/all-categories">
            <FaThLarge size={20} /> Categories
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/admin/all-brands">
            <FaTag size={20} /> Brands
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/admin/all-subCategories">
            <FaTh size={20} /> SubCategories
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="/admin/all-coupons">
            <FaTicketAlt size={20} /> Coupons
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AdminLayout;
