import { TReview } from '@types';
import { FaStar } from 'react-icons/fa6';

import styles from './styles.module.css';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useRemoveReviewMutation } from '@store/review/reviewsApi';
import { memo } from 'react';
const { reviewWrapper, CTitle } = styles;
const Review = memo(
  ({
    _id,
    user,
    ratings,
    title,
    showEditAndRemoveIcons,
    handleEdit,
    showForm,
  }: TReview & {
    showEditAndRemoveIcons?: boolean;
    handleEdit?: (id: string) => void;
    showForm?: () => void;
  }) => {
    const [
      removeReview,
      { isLoading: removeReviewLoading, error: removeReviewError },
    ] = useRemoveReviewMutation();
    const handleOnEdit = () => {
      handleEdit && handleEdit(_id);
      showForm && showForm();
    };
    return (
      <div className={reviewWrapper}>
        <h4>
          <span>{user.name}</span>
          {'  '}
          <FaStar color="#FFD700" size={20} />{' '}
          <span style={{ color: '#FFD700', fontSize: '20px' }}>{ratings}</span>
        </h4>
        <p className={CTitle}>{title}</p>
        {showEditAndRemoveIcons && (
          <>
            <div className="d-flex justify-content-center mt-1 gap-2">
              {handleEdit && (
                <div onClick={handleOnEdit} style={{ cursor: 'pointer' }}>
                  <FaRegEdit />
                </div>
              )}
              <div
                onClick={() => removeReview(_id)}
                style={{ cursor: 'pointer' }}
              >
                {removeReviewLoading ? (
                  <>
                    <Spinner animation="border" size="sm"></Spinner>
                  </>
                ) : (
                  <FaRegTrashAlt />
                )}
              </div>
            </div>
            {removeReviewError && <ErrorMessage error={removeReviewError} />}
          </>
        )}
      </div>
    );
  }
);

export default Review;
