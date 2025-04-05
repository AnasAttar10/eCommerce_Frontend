import { Button, Form, Spinner } from 'react-bootstrap';
import Input from '../Input/Input';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addBrandSchema,
  updateBrandSchema,
} from '@validations/Admin/addBrandSchema';
import FileAndDateInput from '../FileInput/FileInput';
import { useEffect } from 'react';
import useUploadImage from '@hooks/useUploadImage';
import {
  useAddBrandMutation,
  useGetBrandQuery,
  useUpdateBrandMutation,
} from '@store/Brand/brandsApi';
type TAddBrandForm = {
  recordId: string;
  handleCloseForm: () => void;
};
type TBrandForm = {
  name: string;
  image: File | string | undefined;
};
const AddBrandForm = ({ recordId, handleCloseForm }: TAddBrandForm) => {
  const { image, setImage, onImageChange } = useUploadImage();
  const {
    data,
    error: getBrandError,
    refetch,
  } = useGetBrandQuery(recordId, {
    skip: !recordId,
  });
  const [
    addBrand,
    {
      isLoading: addBrandLoading,
      error: addBrandError,
      isSuccess: isSuccessAdding,
    },
  ] = useAddBrandMutation();
  const [
    updateBrand,
    {
      isLoading: updateBrandLoading,
      error: updateBrandError,
      isSuccess: isSuccessUpdating,
    },
  ] = useUpdateBrandMutation();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TBrandForm>({
    mode: 'onSubmit',
    resolver: zodResolver(recordId ? updateBrandSchema : addBrandSchema),
  });
  const addBrandSubmit: SubmitHandler<TBrandForm> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    await addBrand(formData);
  };
  const updateBrandSubmit: SubmitHandler<TBrandForm> = async (formData) => {
    const updateDataForm = new FormData();
    const updatedFields: Partial<TBrandForm> = {};
    if (!data?.data) return;
    if (formData.name !== data.data.name) {
      updatedFields.name = formData.name;
      updateDataForm.append('name', formData.name);
    }
    if (formData.image !== data.data.image) {
      updateDataForm.append('image', formData.image as File);
      updatedFields.image = formData.image;
    }
    if (Object.keys(updatedFields).length > 0) {
      await updateBrand({ data: updateDataForm, id: recordId });
    } else {
      console.log('No changes detected');
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data?.data?.name,
        image: data?.data?.image,
      });
      setImage({ url: data.data.image, name: data.data.name });
    } else {
      reset({
        name: '',
        image: '',
      });
      setImage(undefined);
    }
  }, [data?.data, setImage, reset]);
  useEffect(() => {
    if (isSuccessAdding) handleCloseForm();
    if (isSuccessUpdating) {
      refetch();
      handleCloseForm();
    }
  }, [refetch, isSuccessAdding, isSuccessUpdating, handleCloseForm]);
  return (
    <div>
      <Form
        onSubmit={handleSubmit(recordId ? updateBrandSubmit : addBrandSubmit)}
        className="col-xs-12 col-md-6"
      >
        <Input
          label="Brand Name "
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <FileAndDateInput
          inputId="BrandButton"
          label="Brand Image "
          name="image"
          type="file"
          accept="image/*"
          control={control}
          error={errors.image?.message}
          srcAndName={
            image
              ? [image]
              : data && [{ url: data.data.image, name: data.data.name }]
          }
          multiple={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('image', file, { shouldValidate: true });
              trigger('image');
              onImageChange(file);
            }
          }}
        />
        <Button variant="primary" type="submit">
          {addBrandLoading || updateBrandLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            `${recordId ? 'Update' : 'Add'} Brand`
          )}
        </Button>
        {getBrandError && <ErrorMessage error={getBrandError} />}
        {addBrandError && <ErrorMessage error={addBrandError} />}
        {updateBrandError && <ErrorMessage error={updateBrandError} />}
      </Form>
    </div>
  );
};

export default AddBrandForm;
