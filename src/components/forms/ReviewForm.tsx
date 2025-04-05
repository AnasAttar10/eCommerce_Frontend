import { Button, Form, Spinner } from 'react-bootstrap';
import Input from './Input/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Rating, Star } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema, TAddReview } from '@validations/reviewSchema';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import {
  useAddReviewMutation,
  useGetReviewQuery,
  useUpdateReviewMutation,
} from '@store/review/reviewsApi';
import { useEffect, useState } from 'react';
type TReviewForm = {
  recordId: string;
  productId: string;
  handleCloseForm: () => void;
};
const customStyles = {
  itemShapes: Star,
  itemStrokeWidth: 2,
  activeFillColor: '#FFD700',
  inactiveFillColor: '#D3D3D3',
};
const ReviewForm = ({ productId, recordId, handleCloseForm }: TReviewForm) => {
  const {
    data,
    error: getReviewError,
    refetch,
  } = useGetReviewQuery(recordId, {
    skip: !recordId,
  });
  const [
    addReview,
    {
      isLoading: addReviewLoading,
      error: addReviewError,
      isSuccess: isSuccessAdding,
    },
  ] = useAddReviewMutation();
  const [
    updateReview,
    {
      isLoading: updateReviewLoading,
      error: updateReviewError,
      isSuccess: isSuccessUpdating,
    },
  ] = useUpdateReviewMutation();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddReview & { _id: string }>({
    mode: 'onBlur',
    resolver: zodResolver(reviewSchema),
  });
  const addingSubmit: SubmitHandler<TAddReview> = async (data) => {
    await addReview({ body: data, productId: productId });
  };
  const updatingSubmit: SubmitHandler<TAddReview> = async (formData) => {
    const updatedFields: Partial<TAddReview> = {};
    if (!data?.data) return;
    if (formData.title !== data.data.title) {
      updatedFields.title = formData.title;
    }
    if (formData.ratings !== data.data.ratings) {
      updatedFields.ratings = formData.ratings;
    }
    if (Object.keys(updatedFields).length > 0) {
      await updateReview({ data: updatedFields, id: recordId });
    } else {
      console.log('No changes detected');
    }
  };

  useEffect(() => {
    if (data?.data) {
      reset({
        title: data?.data?.title,
        ratings: data?.data?.ratings,
      });
      setRating(data?.data.ratings);
    } else {
      reset({
        title: '',
        ratings: 5,
      });
      setRating(5);
    }
  }, [data?.data, reset]);

  useEffect(() => {
    if (isSuccessAdding) handleCloseForm();
    if (isSuccessUpdating) {
      refetch();
      handleCloseForm();
    }
  }, [refetch, isSuccessAdding, isSuccessUpdating, handleCloseForm]);

  const [rating, setRating] = useState(5);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setValue('ratings', newRating);
  };

  return (
    <>
      <Form
        onSubmit={
          recordId ? handleSubmit(updatingSubmit) : handleSubmit(addingSubmit)
        }
      >
        <div>
          <h2>ratings {rating} stars</h2>
          <Rating
            value={rating}
            onChange={handleRatingChange}
            // readOnly
            style={{ maxWidth: 100 }}
            itemStyles={customStyles}
            halfFillMode="svg"
          />
        </div>
        <Input
          label="comment"
          name="title"
          as="textarea"
          register={register}
          error={errors.title?.message}
        />
        <Button variant="primary" type="submit">
          {addReviewLoading || updateReviewLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            `${recordId ? 'Update' : 'Add'} Review `
          )}
        </Button>
        <p></p>
        {getReviewError && <ErrorMessage error={getReviewError} />}
        {addReviewError && <ErrorMessage error={addReviewError} />}
        {updateReviewError && <ErrorMessage error={updateReviewError} />}
      </Form>
    </>
  );
};

export default ReviewForm;
