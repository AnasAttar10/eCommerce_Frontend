import { useNavigate } from 'react-router-dom';

const ForgotPasswordLink = () => {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: '10px' }}>
      <span
        onClick={() => navigate('/auth/forgot-password')}
        style={{
          textDecoration: 'underline',
          color: 'blue',
          cursor: 'pointer',
        }}
      >
        Forgot your Password ?
      </span>
    </div>
  );
};

export default ForgotPasswordLink;
