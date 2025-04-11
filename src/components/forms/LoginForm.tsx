import { Button, Form, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import { useSignInMutation } from '@store/auth/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInSchema, TSignIn } from '@validations/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import ForgotPasswordLink from './ForgotPasswordLink/ForgotPasswordLink';
import { useNavigate } from 'react-router-dom';
type TLoginForm = {
  handleNavigate: (targetPath: string) => void;
};
const LoginForm = ({ handleNavigate }: TLoginForm) => {
  const navigate = useNavigate();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({ mode: 'onBlur', resolver: zodResolver(signInSchema) });
  const submit: SubmitHandler<TSignIn> = async (data) => {
    // if (searchParams.get('message')) setSearchParams('');
    signIn(data)
      .unwrap()
      .then(() => handleNavigate('/'));
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(submit)}>
        <Input
          label="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />
        <ForgotPasswordLink />
        <Button variant="primary" type="submit">
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'Login'
          )}
        </Button>
        <div style={{ marginTop: '20px' }}>
          Don't have an account ?{' '}
          <span
            onClick={() => navigate('/auth/register')}
            style={{
              textDecoration: 'underline',
              color: 'blue',
              cursor: 'pointer',
            }}
          >
            Register!
          </span>
        </div>
        {error && <ErrorMessage error={error} />}
      </Form>
    </div>
  );
};

export default LoginForm;
