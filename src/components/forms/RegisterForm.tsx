import { Button, Form } from 'react-bootstrap';
import { Input } from '@components/forms';
import useCheckingEmail from '@hooks/useCheckingEmail';
import { useSignUpMutation } from '@store/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, TSignUp } from '@validations/signUpSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { enteredEmail, emailStatus, handleCheckingEmail, reset } =
    useCheckingEmail();
  const [signUp] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TSignUp>({ mode: 'onBlur', resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<TSignUp> = async (data) => {
    signUp(data)
      .unwrap()
      .then(() => navigate('/login?message=account_created'));
  };
  const handleEmailOnBlue = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger('email');
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState('email');
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      handleCheckingEmail(value);
    }
    // to fix , if you entered valid email then entered invalid email then entered the same valid email
    if (isDirty && invalid && enteredEmail) {
      reset();
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="name"
        register={register}
        error={errors.name?.message}
      />
      <Input
        name="email"
        label="email"
        register={register}
        error={
          errors.email?.message
            ? (errors.email?.message as string)
            : emailStatus === 'notAvailable'
              ? 'This email is already existent'
              : emailStatus === 'failed'
                ? 'Error from server'
                : ''
        }
        onBlur={handleEmailOnBlue}
        formText={
          emailStatus === 'checking'
            ? "we're currently checking the availability of this email address , please wait a moment"
            : ''
        }
        success={
          emailStatus === 'available' ? 'This email is available to use ' : ''
        }
        disabled={emailStatus === 'checking'}
      />
      <Input
        name="password"
        label="password"
        type="password"
        register={register}
        error={errors.password?.message as string}
      />
      <Input
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        register={register}
        error={errors.confirmPassword?.message as string}
      />
      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
