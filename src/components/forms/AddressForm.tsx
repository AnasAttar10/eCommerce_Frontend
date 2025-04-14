import { Button, Form, Spinner } from 'react-bootstrap';

import { SubmitHandler, useForm } from 'react-hook-form';
import { addressSchema, TAddAddress } from '@validations/addressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useAddAddressMutation } from '@store/address/addressApi';
import Input from './Input/Input';
import { memo, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
type TAddressForm = {
  handleShowForm?: (status: boolean) => void;
};
const AddressForm = memo(({ handleShowForm }: TAddressForm) => {
  const [
    addAddress,
    { isLoading: addAddressLoading, error: addAddressError, isSuccess },
  ] = useAddAddressMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddAddress & { _id: string }>({
    mode: 'onBlur',
    resolver: zodResolver(addressSchema),
  });
  const submit: SubmitHandler<TAddAddress & { _id: string }> = async (data) => {
    for (const key of Object.keys(data) as (keyof TAddAddress)[]) {
      if (data[key] === '') delete data[key];
    }
    await addAddress(data);
  };
  useEffect(() => {
    if (isSuccess && handleShowForm) handleShowForm(false);
  }, [isSuccess, handleShowForm]);
  return (
    <div>
      <div
        style={{
          position: 'relative',
          padding: '10px',
        }}
      >
        {handleShowForm && (
          <div
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '5px',
              right: '10px',
            }}
            onClick={() => handleShowForm(false)}
          >
            <MdArrowBack size={20} />
          </div>
        )}
      </div>
      <Form onSubmit={handleSubmit(submit)} className="col-xs-12 col-md-6">
        <Input
          label="city"
          name="city"
          register={register}
          error={errors.city?.message}
        />
        <Input
          label="alias"
          name="alias"
          register={register}
          error={errors.alias?.message}
        />
        <Input
          label="phone"
          name="phone"
          register={register}
          error={errors.phone?.message}
        />
        <Input
          label="postalCode"
          name="postalCode"
          register={register}
          error={errors.postalCode?.message}
        />
        <Input
          label="details"
          name="details"
          register={register}
          error={errors.details?.message}
        />
        <Button variant="primary" type="submit">
          {addAddressLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'Add new Address '
          )}
        </Button>
        {addAddressError && <ErrorMessage error={addAddressError} />}
      </Form>
    </div>
  );
});

export default AddressForm;
