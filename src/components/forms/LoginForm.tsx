import { Button, Form, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import { useSignInMutation } from '@store/auth/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInSchema, TSignIn } from '@validations/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import ForgotPasswordLink from './ForgotPasswordLink/ForgotPasswordLink';
type TLoginForm = {
  handleNavigate: (targetPath: string) => void;
};
const LoginForm = ({ handleNavigate }: TLoginForm) => {
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
        {error && <ErrorMessage error={error} />}
      </Form>
    </div>
  );
};

export default LoginForm;
