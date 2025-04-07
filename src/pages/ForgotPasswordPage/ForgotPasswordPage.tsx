import ForgotPasswordForm from '@components/forms/ForgotPasswordForm';
import { Col, Container, Row } from 'react-bootstrap';
import img from '@assets/images/auth.jpg';
const ForgotPasswordPage = () => {
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-2">
          <div>
            <img src={img} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
        <Col>
          <ForgotPasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordPage;
