import { Alert, Button, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import SelectInput from '@components/forms/SelectInput/SelectInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { ErrorResponse, TAddress } from '@types';
import { useEffect } from 'react';
import ModalB from '@components/feedback/Modal/ModalB';
import AddressForm from '@components/forms/AddressForm';
import Loading from '@components/feedback/Loading/Loading';

type TCartSubtotal = {
  hasDiscount: boolean;
  subTotal: number;
  addCashOrderLoading: boolean;
  addresses: TAddress[];
  getAddressesLoading: boolean;
  getAddressesError: ErrorResponse | undefined;
  getSelectedAddress: (address: TAddress) => void;
  handleAddOrder: () => void;
  handleCheckout: () => void;
  showAddressForm: boolean;
  handleShowAddressForm: (status: boolean) => void;
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
  getSelectedAddress,
  showAddressForm,
  handleShowAddressForm,
  addresses,
  getAddressesLoading,
  getAddressesError,
  handleAddOrder,
  handleCheckout,
  addCashOrderLoading,
}: TCartSubtotal) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<TAddressForm>({
    mode: 'onSubmit',
    resolver: zodResolver(addressSchema),
  });
  const selectedAddressId = watch();
  const fullAddress =
    addresses.length == 1
      ? addresses[0]
      : addresses.find((ad) => ad._id === selectedAddressId.address);

  useEffect(() => {
    if (fullAddress) getSelectedAddress(fullAddress);
  }, [fullAddress, getSelectedAddress]);

  useEffect(() => {
    if (addresses.length > 0 && showAddressForm) handleShowAddressForm(false);
  }, [addresses, showAddressForm, handleShowAddressForm]);

  return (
    <>
      <ModalB
        show={showAddressForm}
        title={'add Address'}
        message={<AddressForm />}
        handleClose={() => handleShowAddressForm(false)}
        showButtons={false}
      />
      <div className={styles.container}>
        <span>{hasDiscount ? 'total Price After Discount' : 'Subtotal:'}</span>
        <h3>
          {subTotal.toFixed(2)} <span style={{ fontSize: '18px' }}>₪</span>
        </h3>
      </div>
      <hr />

      <div>
        <h4>Choose payment method</h4>
        <p></p>
        <div>
          {addresses.length > 1 && (
            <Loading
              isLoading={getAddressesLoading}
              error={getAddressesError}
              type="table"
            >
              <SelectInput
                name="address"
                label="Choose your address"
                control={control}
                options={addresses.map((s) => ({
                  value: s._id,
                  label: s.alias,
                }))}
                error={errors.address?.message}
                multiple={false}
              />
              {!fullAddress && (
                <p style={{ fontSize: '12px', color: 'red' }}>
                  please select your address
                </p>
              )}
            </Loading>
          )}
          {addresses.length == 1 && (
            <Alert variant="success">
              Address added successfully 🎉 You’re all set to complete your
              order!
            </Alert>
          )}
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
                onClick={handleAddOrder}
              >
                Cash
              </Button>
            )}
            <Button
              variant="secondary"
              style={{ color: 'white' }}
              onClick={handleCheckout}
            >
              Credit Card
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSubtotal;
