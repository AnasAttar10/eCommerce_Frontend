import { Button, Form, Spinner } from 'react-bootstrap';
import Input from '../Input/Input';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useGetCategoriesQuery } from '@store/Category/categoriesApi';
import SelectInput from '../SelectInput/SelectInput';
import {
  addSubCategorySchema,
  updateSubCategorySchema,
} from '@validations/Admin/addSubCategorySchema';
import {
  useAddSubCategoryMutation,
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from '@store/SubCategories/subCategoriesApi';
type TAddCategoryForm = {
  recordId: string;
  handleCloseForm: () => void;
};
type TSubCategoryForm = {
  name: string;
  category: string;
};
const AddSubCategoryForm = ({
  recordId,
  handleCloseForm,
}: TAddCategoryForm) => {
  const {
    data: categories,
    isLoading: getCategoriesLoading,
    error: getCategoriesError,
  } = useGetCategoriesQuery('');

  const {
    data,
    error: getSubCategoryError,
    refetch,
  } = useGetSubCategoryQuery(recordId, {
    skip: !recordId,
  });
  const [
    addSubCategory,
    {
      isLoading: addSubCategoryLoading,
      error: addSubCategoryError,
      isSuccess: isSuccessAdding,
    },
  ] = useAddSubCategoryMutation();
  const [
    updateSubCategory,
    {
      isLoading: updateSubCategoryLoading,
      error: updateSubCategoryError,
      isSuccess: isSuccessUpdating,
    },
  ] = useUpdateSubCategoryMutation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TSubCategoryForm>({
    mode: 'onSubmit',
    resolver: zodResolver(
      recordId ? updateSubCategorySchema : addSubCategorySchema
    ),
  });

  const addingSubmit: SubmitHandler<TSubCategoryForm> = async (data) => {
    await addSubCategory({ data: data, categoryId: data.category });
  };
  const updatingSubmit: SubmitHandler<TSubCategoryForm> = async (formData) => {
    const updatedFields: Partial<TSubCategoryForm> = {};
    if (!data?.data) return;
    if (formData.name !== data.data.name) {
      updatedFields.name = formData.name;
    }
    if (formData.category !== data.data.category) {
      updatedFields.category = formData.category;
    }
    if (Object.keys(updatedFields).length > 0) {
      await updateSubCategory({ data: updatedFields, subCategoryId: recordId });
    } else {
      console.log('No changes detected');
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        category: data.data.category,
      });
    } else {
      reset({
        name: '',
        category: '',
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
    <div>
      <Form
        onSubmit={
          recordId ? handleSubmit(updatingSubmit) : handleSubmit(addingSubmit)
        }
        className="col-xs-12 col-md-6"
      >
        <Input
          label="subCategory Name "
          name="name"
          register={register}
          error={errors.name?.message}
        />
        {!getCategoriesLoading && (
          <SelectInput
            name="category"
            label="Category"
            control={control}
            options={
              categories?.data
                ? categories?.data.map((s) => ({
                    value: s._id,
                    label: s.name,
                  }))
                : []
            }
            error={errors.category?.message}
            multiple={false}
          />
        )}
        <Button variant="primary" type="submit">
          {addSubCategoryLoading || updateSubCategoryLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            `${recordId ? 'Update' : 'Add'} subCategory `
          )}
        </Button>
        {addSubCategoryError && <ErrorMessage error={addSubCategoryError} />}
        {updateSubCategoryError && (
          <ErrorMessage error={updateSubCategoryError} />
        )}
        {getSubCategoryError && <ErrorMessage error={getSubCategoryError} />}
        {getCategoriesError && <ErrorMessage error={getCategoriesError} />}
      </Form>
    </div>
  );
};

export default AddSubCategoryForm;
