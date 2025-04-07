import { Heading } from '@components/common';
import RegisterForm from '@components/forms/RegisterForm';
import { Col, Container, Row } from 'react-bootstrap';
import img from '@assets/images/auth.jpg';
const Register = () => {
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-2">
          <div>
            <img src={img} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
        <Col md={6}>
          <Heading title="Create account" />
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
