import { zodResolver } from '@hookform/resolvers/zod';
import {
  forgotPasswordSchema,
  TForgotPassword,
} from '@validations/forgotPasswordSchema';
import { Button, Form, Spinner } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/forms';
import { Heading } from '@components/common';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useForgotPasswordMutation } from '@store/auth/authApi';
import SuccessMessage from '@components/feedback/SuccessMessage/SuccessMessage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error, data, isSuccess }] =
    useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPassword>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
  });
  const submit: SubmitHandler<TForgotPassword> = async (data) => {
    forgotPassword(data).unwrap();
  };
  useEffect(() => {
    if (isSuccess)
      setTimeout(() => {
        navigate('/auth/verify-password');
      }, 2000);
  }, [isSuccess, navigate]);
  return (
    <div>
      <Heading title="Forgot The Password" />
      {data && <SuccessMessage message={data.message} />}
      <Form onSubmit={handleSubmit(submit)}>
        <Input
          label="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Button variant="primary" type="submit">
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'Send The Code '
          )}
        </Button>
        {error && <ErrorMessage error={error} />}
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
