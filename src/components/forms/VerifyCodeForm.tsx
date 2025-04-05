import { Heading } from '@components/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { TVerifyCode, verifyCodeSchema } from '@validations/verifyCodeSchema';
import { Button, Form, Spinner } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/forms';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useVerifyCodeMutation } from '@store/auth/authApi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCodeForm = () => {
  const navigate = useNavigate();
  const [verifyCode, { isLoading, error, isSuccess }] = useVerifyCodeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVerifyCode>({
    mode: 'onBlur',
    resolver: zodResolver(verifyCodeSchema),
  });
  const submit: SubmitHandler<TVerifyCode> = async (data) => {
    verifyCode(data).unwrap();
  };
  useEffect(() => {
    if (isSuccess) navigate('/auth/reset-password');
  }, [isSuccess, navigate]);
  return (
    <div>
      <Heading title="Enter the code sent in the email" />
      <Form onSubmit={handleSubmit(submit)}>
        <Input
          label="resetCode"
          name="resetCode"
          register={register}
          error={errors.resetCode?.message}
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

export default VerifyCodeForm;
