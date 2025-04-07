import { Heading } from '@components/common';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '@components/forms/LoginForm';
import img from '@assets/images/auth.jpg';
const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleNavigate = (targetPath: string) => {
    navigate(targetPath);
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="mb-2">
          <div>
            <img src={img} style={{ width: '100%', height: '100%' }} />
          </div>
        </Col>
        <Col>
          <Heading title="Login" />
          {searchParams.get('message') && (
            <Alert variant="success">{searchParams.get('message')}</Alert>
          )}
          <LoginForm handleNavigate={handleNavigate} />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
