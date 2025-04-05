import { Button, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import SelectInput from '@components/forms/SelectInput/SelectInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetLoggedUserAddressesQuery } from '@store/address/addressApi';
import z from 'zod';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { TAddress } from '@types';
import { useEffect } from 'react';

type TCartSubtotal = {
  hasDiscount: boolean;
  subTotal: number;
  token: string;
  addCashOrderLoading: boolean;
  getSelectedAddress: (address: TAddress) => void;
  handleAddOrder: () => void;
  handleCheckout: () => void;
};
type TAddressForm = {
  address: string;
};
const addressSchema = z.object({
  address: z
    .string({ message: 'address should be string ' })
    .refine((val) => /^[a-f\d]{24}$/i.test(val), 'Invalid MongoDB ObjectId'),
});
const CartSubtotal = ({
  hasDiscount,
  subTotal,
  token,
  addCashOrderLoading,
  getSelectedAddress,
  handleAddOrder,
  handleCheckout,
}: TCartSubtotal) => {
  const { data, isLoading, error } = useGetLoggedUserAddressesQuery();

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<TAddressForm>({
    mode: 'onSubmit',
    resolver: zodResolver(addressSchema),
  });
  const selectedAddressId = watch();
  const fullAddress = data?.data.find(
    (ad) => ad._id === selectedAddressId.address
  );

  useEffect(() => {
    if (fullAddress) getSelectedAddress(fullAddress);
  }, [fullAddress, getSelectedAddress]);

  return (
    <>
      <div className={styles.container}>
        <span>{hasDiscount ? 'total Price After Discount' : 'Subtotal:'}</span>
        <h3>
          {subTotal.toFixed(2)} <span style={{ fontSize: '18px' }}>₪</span>
        </h3>
      </div>
      <hr />
      <div>
        <h4>Choose payment method</h4>
        <div>
          {!isLoading && (
            <SelectInput
              name="address"
              label="Address"
              control={control}
              options={
                data?.data
                  ? data?.data.map((s) => ({
                      value: s._id,
                      label: s.alias,
                    }))
                  : []
              }
              error={errors.address?.message}
              multiple={false}
            />
          )}
          {token && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '60px',
              }}
            >
              {addCashOrderLoading ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading ...
                </>
              ) : (
                <Button
                  variant="secondary"
                  style={{ color: 'white' }}
                  disabled={!fullAddress}
                  onClick={handleAddOrder}
                >
                  Cash
                </Button>
              )}
              <Button
                variant="secondary"
                style={{ color: 'white' }}
                disabled={!fullAddress}
                onClick={handleCheckout}
              >
                Credit Card
              </Button>
            </div>
          )}
        </div>
      </div>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default CartSubtotal;
