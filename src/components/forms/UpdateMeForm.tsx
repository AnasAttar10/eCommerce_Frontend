import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateMeMutation } from '@store/user/userApi';
import { TUpdateMe, updateMeSchema } from '@validations/updateMeSchema';
import { useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Input } from '@components/forms';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { TGetMe } from '@types';
type TUpdateMeForm = {
  user: TGetMe;
  handleShowForm: (status: boolean) => void;
};
const UpdateMeForm = ({ user, handleShowForm }: TUpdateMeForm) => {
  const [
    updateMe,
    {
      isLoading: updateMeLoading,
      error: updateMeError,
      isSuccess: updateMeSuccess,
    },
  ] = useUpdateMeMutation();
  const removeUnUpdatedFields = (prevData: TUpdateMe, newData: TUpdateMe) => {
    for (const key of Object.keys(prevData) as (keyof typeof prevData)[]) {
      if (newData[key] === prevData[key]) {
        delete newData[key];
      }
    }
    return newData;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateMe>({
    mode: 'onBlur',
    resolver: zodResolver(updateMeSchema),
  });
  const submit: SubmitHandler<TUpdateMe> = async (data) => {
    let FilteredData;
    if (user) FilteredData = removeUnUpdatedFields(user?.data, data);
    if (FilteredData) await updateMe(FilteredData);
  };
  useEffect(() => {
    if (updateMeSuccess) handleShowForm(false);
  }, [updateMeSuccess, handleShowForm]);

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px',
      }}
    >
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

      <Form onSubmit={handleSubmit(submit)}>
        <Input
          register={register}
          label="name"
          name="name"
          defaultValue={user?.data?.name}
          error={errors?.name?.message}
        />
        <Input
          register={register}
          label="email"
          name="email"
          defaultValue={user?.data?.email}
          error={errors?.email?.message}
        />
        <Input
          register={register}
          label="phone"
          name="phone"
          defaultValue={user?.data?.phone}
          error={errors?.phone?.message}
        />
        <Button variant="primary" type="submit">
          {updateMeLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'update'
          )}
        </Button>
        {updateMeError && <ErrorMessage error={updateMeError} />}
      </Form>
    </div>
  );
};

export default UpdateMeForm;
