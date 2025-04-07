import ResetPasswordForm from '@components/forms/ResetPasswordForm';
import { Col, Container, Row } from 'react-bootstrap';
import img from '@assets/images/auth.jpg';
const ResetPasswordPage = () => {
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-2">
          <div>
            <img src={img} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
        <Col>
          <ResetPasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordPage;
