import { Heading } from '@components/common';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  resetPasswordSchema,
  TResetPassword,
} from '@validations/resetPasswordSchema';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useResetPasswordMutation } from '@store/auth/authApi';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPassword>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
  });
  const submit: SubmitHandler<TResetPassword> = async (data) => {
    resetPassword(data)
      .unwrap()
      .then(() => navigate('/'));
  };
  return (
    <div>
      <Heading title="Enter the code sent in the email" />
      <Form onSubmit={handleSubmit(submit)}>
        <Input
          label="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="new password"
          name="newPassword"
          register={register}
          error={errors.newPassword?.message}
        />
        <Button variant="primary" type="submit">
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'Next '
          )}
        </Button>
        {error && <ErrorMessage error={error} />}
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
