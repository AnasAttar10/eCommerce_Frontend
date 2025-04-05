import { TAddress } from '@types';
import { FaTrash } from 'react-icons/fa6';
import styles from './styles.module.css';
import { useRemoveAddressMutation } from '@store/address/addressApi';
import { Spinner } from 'react-bootstrap';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
const AddressContainer = ({
  _id,
  city,
  alias,
  phone,
  postalCode,
  details,
}: TAddress) => {
  const { addressContainer, trashIconContainer } = styles;
  const [
    removeAddress,
    { isLoading: removeAddressLoading, error: removeAddressError },
  ] = useRemoveAddressMutation();
  const handleRemoveAddress = async () => {
    await removeAddress(_id);
  };
  return (
    <div className={addressContainer}>
      {city && <p>City : {city}</p>}
      {alias && <p>Alias : {alias}</p>}
      {phone && <p>Phone : {phone}</p>}
      {postalCode && <p>PostalCode : {postalCode}</p>}
      {details && <p>Details : {details}</p>}
      <div className={trashIconContainer}>
        {removeAddressLoading ? (
          <>
            <Spinner animation="border" size="sm"></Spinner> Loading ...
          </>
        ) : (
          <div onClick={handleRemoveAddress}>
            <FaTrash />
          </div>
        )}
      </div>
      {removeAddressError && <ErrorMessage error={removeAddressError} />}
    </div>
  );
};

export default AddressContainer;
