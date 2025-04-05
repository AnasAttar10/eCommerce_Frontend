import { TCoupon } from '@types';
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import { formatDate } from '@util/date';
import { useRemoveCouponMutation } from '@store/coupon/couponApi';
import { Spinner } from 'react-bootstrap';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import useRemovingMessage from '@hooks/useRemovingMessage';
import ModalB from '@components/feedback/Modal/ModalB';
const {
  couponContainer,
  rotatedTextContainer,
  rotatedText,
  rotatedTextValid,
  rotatedTextInvalid,
  iconsContainer,
  icon,
  dateWrapper,
  date,
  couponText,
  couponName,
  couponInformationContainer,
} = styles;
const Coupon = ({
  _id,
  name,
  expire,
  discount,
  handleEdit,
  showEditAndRemoveIcons = false,
}: TCoupon & {
  handleEdit: (id: string) => void;
  showEditAndRemoveIcons: boolean;
}) => {
  const {
    showRemovingMessage,
    setShowRemovingMessage,
    selectedElement,
    handleRemovingMessage,
  } = useRemovingMessage();
  const isExpired = new Date(expire) < new Date();
  const [removeCoupon, { isLoading, error }] = useRemoveCouponMutation();
  const handleOnRemove = async () => {
    if (selectedElement) {
      await removeCoupon(selectedElement);
      setShowRemovingMessage(false);
    }
  };
  return (
    <div>
      <ModalB
        show={showRemovingMessage}
        title={'Remove Coupon'}
        message={`Are you sure you want to remove this coupon`}
        handleClose={() => setShowRemovingMessage(false)}
        handleSave={handleOnRemove}
      />
      <div
        className={couponContainer}
        style={{
          backgroundColor: isExpired ? 'rgb(143, 56, 56)' : 'rgb(56, 143, 89)',
        }}
      >
        <div className={rotatedTextContainer}>
          <span
            className={
              isExpired
                ? `${rotatedText} ${rotatedTextInvalid}`
                : `${rotatedText} ${rotatedTextValid}`
            }
          >
            {discount}%
          </span>
        </div>
        <div className={couponInformationContainer}>
          <span className={couponName}>{name}</span>
          <span className={couponText}>Coupon</span>
          <span className={dateWrapper}>
            {isExpired ? 'Expire Date : ' : 'VALID UNTIL : '}
            <span className={date}>{formatDate(expire.toString())}</span>
          </span>
          {showEditAndRemoveIcons && (
            <div className={iconsContainer}>
              <div className={icon} onClick={() => handleEdit(_id)}>
                <FaEdit />
              </div>
              <div className={icon} onClick={() => handleRemovingMessage(_id)}>
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm"></Spinner>
                  </>
                ) : (
                  <FaRegTrashAlt />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default Coupon;
