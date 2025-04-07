import VerifyCodeForm from '@components/forms/VerifyCodeForm';
import { Col, Container, Row } from 'react-bootstrap';
import img from '@assets/images/auth.jpg';

const VerifyCodePage = () => {
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-2">
          <div>
            <img src={img} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
        <Col>
          <VerifyCodeForm />
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyCodePage;
