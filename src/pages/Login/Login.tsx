import { Heading } from '@components/common';
import { Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginForm from '@components/forms/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handleNavigate = (targetPath: string) => {
    navigate(targetPath);
  };
  return (
    <>
      <Heading title="Login" />
      {searchParams.get('message') && (
        <Alert variant="success">{searchParams.get('message')}</Alert>
      )}
      <LoginForm handleNavigate={handleNavigate} />
    </>
  );
};

export default Login;
