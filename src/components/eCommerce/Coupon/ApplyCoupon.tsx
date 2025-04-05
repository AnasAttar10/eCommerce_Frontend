import { Button, Form, Spinner } from 'react-bootstrap';
import style from './styles.module.css';
import { Input } from '@components/forms';
import { SubmitHandler, useForm } from 'react-hook-form';
import { applyCouponSchema, TApplyCoupon } from '@validations/couponSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApplyCouponMutation } from '@store/cart/cartApi';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
type TApplyCouponComponent = {
  handleRefetchData: () => void;
};
const ApplyCoupon = ({ handleRefetchData }: TApplyCouponComponent) => {
  const { applyCouponContainer, ButtonContainer } = style;
  const [applyCoupon, { isLoading, error, isSuccess }] =
    useApplyCouponMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TApplyCoupon>({
    mode: 'onBlur',
    resolver: zodResolver(applyCouponSchema),
  });
  const submit: SubmitHandler<TApplyCoupon> = async (data) => {
    await applyCoupon(data);
    reset();
  };
  useEffect(() => {
    if (isSuccess) handleRefetchData();
  }, [isSuccess, handleRefetchData]);
  return (
    <Form onSubmit={handleSubmit(submit)} className={applyCouponContainer}>
      <Input
        label="couponName"
        name="coupon"
        register={register}
        error={errors.coupon?.message}
      />
      <div className={ButtonContainer}>
        <Button
          variant="info"
          style={{ color: 'white', width: '100%' }}
          type="submit"
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'Apply Coupon '
          )}
        </Button>
      </div>
      {error && <ErrorMessage error={error} />}
    </Form>
  );
};

export default ApplyCoupon;
