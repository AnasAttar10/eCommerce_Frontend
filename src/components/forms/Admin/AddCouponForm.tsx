import { Button, Form, Spinner } from 'react-bootstrap';
import Input from '../Input/Input';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  addCouponSchema,
  TAddCoupon,
  updateCouponSchema,
} from '@validations/Admin/addCouponSchema';
import DateInput from '../DateInput/DateInput';
import {
  useAddCouponMutation,
  useGetCouponQuery,
  useUpdateCouponMutation,
} from '@store/coupon/couponApi';
type TAddCouponForm = {
  recordId: string;
  handleCloseForm: () => void;
};
type TCouponForm = {
  name: string;
  expire: Date | undefined;
  discount: number;
};
const AddCouponForm = ({ recordId, handleCloseForm }: TAddCouponForm) => {
  const [date, setDate] = useState<Date | null>(null);
  const { data, error: getCouponError, refetch } = useGetCouponQuery(recordId);
  const [
    addCoupon,
    {
      isLoading: addCouponLoading,
      error: addCouponError,
      isSuccess: isSuccessAdding,
    },
  ] = useAddCouponMutation();
  const [
    updateCoupon,
    {
      isLoading: updateCouponLoading,
      error: updateCouponError,
      isSuccess: isSuccessUpdating,
    },
  ] = useUpdateCouponMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TCouponForm>({
    mode: 'onSubmit',
    resolver: zodResolver(recordId ? updateCouponSchema : addCouponSchema),
  });

  const addingSubmit: SubmitHandler<TCouponForm> = async (data) => {
    await addCoupon(data as TAddCoupon);
    handleCloseForm();
  };
  const updatingSubmit: SubmitHandler<TCouponForm> = async (formData) => {
    console.log(formData);

    const updatedFields: Partial<TCouponForm> = {};
    if (!data?.data) return;
    if (formData.name !== data.data.name) {
      updatedFields.name = formData.name;
    }
    if (formData.expire !== data.data.expire) {
      updatedFields.expire = formData.expire;
    }
    if (formData.discount !== data.data.discount) {
      updatedFields.discount = formData.discount;
    }
    if (Object.keys(updatedFields).length > 0) {
      await updateCoupon({ data: updatedFields, id: recordId });
      refetch();
      handleCloseForm();
    } else {
      console.log('No changes detected');
    }
  };
  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        expire: data.data.expire,
        discount: data.data.discount,
      });
    } else {
      reset({
        name: '',
        expire: undefined,
        discount: 0,
      });
    }
  }, [data?.data, reset]);

  useEffect(() => {
    if (isSuccessAdding) handleCloseForm();
    if (isSuccessUpdating) {
      refetch();
      handleCloseForm();
    }
  }, [refetch, isSuccessAdding, isSuccessUpdating, handleCloseForm]);
  return (
    <Form
      onSubmit={handleSubmit(recordId ? updatingSubmit : addingSubmit)}
      className="col-xs-12 col-md-6"
    >
      <Input
        label="Coupon Name "
        name="name"
        register={register}
        error={errors.name?.message}
      />
      <DateInput
        label="Expire Date"
        name="expire"
        date={date}
        control={control}
        onChangeDate={(date) => setDate(date)}
        error={errors.expire?.message}
      />
      <Input
        label="Discount"
        name="discount"
        type="number"
        register={register}
        error={errors.discount?.message}
      />
      <Button variant="primary" type="submit">
        {addCouponLoading || updateCouponLoading ? (
          <>
            <Spinner animation="border" size="sm"></Spinner> Loading ...
          </>
        ) : (
          `${recordId ? 'Update' : 'Add'} Coupon `
        )}
      </Button>
      {getCouponError && <ErrorMessage error={getCouponError} />}
      {addCouponError && <ErrorMessage error={addCouponError} />}
      {updateCouponError && <ErrorMessage error={updateCouponError} />}
    </Form>
  );
};

export default AddCouponForm;
