import { Button, Form, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import { useSignInMutation } from '@store/auth/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signInSchema, TSignIn } from '@validations/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import ForgotPasswordLink from './ForgotPasswordLink/ForgotPasswordLink';
import { useNavigate } from 'react-router-dom';
import useCartItems from '@hooks/useCartItems';
import { useSyncCartAfterLoginMutation } from '@store/cart/cartApi';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearCartInStorage } from '@store/cart/cartSlice';
type TLoginForm = {
  handleNavigate: (targetPath: string) => void;
};
const LoginForm = ({ handleNavigate }: TLoginForm) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { cartItems: cartItemsFromStorage } = useCartItems();
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [syncCartAfterLogin] = useSyncCartAfterLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({ mode: 'onBlur', resolver: zodResolver(signInSchema) });
  const submit: SubmitHandler<TSignIn> = async (data) => {
    try {
      await signIn(data).unwrap();
      if (
        user.role != 'admin' &&
        cartItemsFromStorage &&
        cartItemsFromStorage.length > 0
      ) {
        const validItems = cartItemsFromStorage.filter(
          (item) => item !== undefined
        );
        await syncCartAfterLogin({ cartItems: validItems });
        dispatch(clearCartInStorage());
      }
      handleNavigate('/');
    } catch (err) {
      console.log('Sign in failed:', err);
    }
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
