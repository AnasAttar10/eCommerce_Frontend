import { Button, Form, Spinner } from 'react-bootstrap';
import Input from '../Input/Input';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileAndDateInput from '../FileInput/FileInput';
import useUploadImage from '@hooks/useUploadImage';
import { useEffect } from 'react';
import {
  addCategorySchema,
  updateCategorySchema,
} from '@validations/Admin/addCategorySchema';
import {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '@store/Category/categoriesApi';
type TAddCategoryForm = {
  recordId: string;
  handleCloseForm: () => void;
};
type TCategoryForm = {
  name: string;
  image: File | string | undefined;
};
const AddCategoryForm = ({ recordId, handleCloseForm }: TAddCategoryForm) => {
  const { image, onImageChange, setImage } = useUploadImage();

  const {
    data,
    error: getCategoryError,
    refetch,
  } = useGetCategoryQuery(recordId, {
    skip: !recordId,
  });
  const [
    addCategory,
    {
      isLoading: addCategoryLoading,
      error: addCategoryError,
      isSuccess: isSuccessAdding,
    },
  ] = useAddCategoryMutation();
  const [
    updateCategory,
    {
      isLoading: updateCategoryLoading,
      error: updateCategoryError,
      isSuccess: isSuccessUpdating,
    },
  ] = useUpdateCategoryMutation();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TCategoryForm>({
    mode: 'onSubmit',
    resolver: zodResolver(recordId ? updateCategorySchema : addCategorySchema),
  });

  const addingSubmit: SubmitHandler<TCategoryForm> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    await addCategory(formData);
  };
  const updatingSubmit: SubmitHandler<TCategoryForm> = async (formData) => {
    const updateDataForm = new FormData();
    const updatedFields: Partial<TCategoryForm> = {};
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
      await updateCategory({ data: updateDataForm, id: recordId });
    } else {
      console.log('No changes detected');
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        image: data.data.image,
      });
      setImage({ url: data.data.image, name: data.data.name });
    } else {
      reset({
        name: '',
        image: '',
      });
      setImage(undefined);
    }
  }, [data?.data, reset, setImage]);

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
        onSubmit={
          recordId ? handleSubmit(updatingSubmit) : handleSubmit(addingSubmit)
        }
        className="col-xs-12 col-md-6"
      >
        <Input
          label="Category Name "
          name="name"
          register={register}
          error={errors.name?.message}
        />
        <FileAndDateInput
          inputId="categoryButton"
          label="Category Image "
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
          {addCategoryLoading || updateCategoryLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            `${recordId ? 'Update' : 'Add'} Category `
          )}
        </Button>
        {addCategoryError && <ErrorMessage error={addCategoryError} />}
        {updateCategoryError && <ErrorMessage error={updateCategoryError} />}
        {getCategoryError && <ErrorMessage error={getCategoryError} />}
      </Form>
    </div>
  );
};

export default AddCategoryForm;
