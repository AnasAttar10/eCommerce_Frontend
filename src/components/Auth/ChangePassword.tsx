import { Heading } from '@components/common';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { Input } from '@components/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangeMyPasswordMutation } from '@store/user/userApi';
import {
  changePasswordSchema,
  TChangePassword,
} from '@validations/changePasswordSchema';
import { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [
    changeMyPassword,
    {
      isLoading: changeMyPasswordLoading,
      error: changeMyPasswordError,
      isSuccess,
    },
  ] = useChangeMyPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePassword>({
    mode: 'onBlur',
    resolver: zodResolver(changePasswordSchema),
  });
  const submit: SubmitHandler<TChangePassword> = async (data) => {
    await changeMyPassword(data);
  };
  useEffect(() => {
    if (isSuccess) navigate('/login');
  }, [isSuccess, navigate]);
  return (
    <div style={{ borderTop: '1px solid gray', padding: '10px 0' }}>
      <Heading title="change password" />

      <Form onSubmit={handleSubmit(submit)}>
        <Input
          register={register}
          label="current Password"
          name="currentPassword"
          error={errors?.currentPassword?.message}
        />
        <Input
          register={register}
          label="new Password"
          name="password"
          error={errors?.password?.message}
        />
        <Input
          register={register}
          label="password Confirm"
          name="passwordConfirm"
          error={errors?.passwordConfirm?.message}
        />
        <Button variant="primary" type="submit">
          {changeMyPasswordLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'update Password'
          )}
        </Button>
        {changeMyPasswordError && (
          <ErrorMessage error={changeMyPasswordError} />
        )}
      </Form>
    </div>
  );
};

export default ChangePassword;
