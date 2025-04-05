import emptyImage from '@assets/svg/emptyimage.svg';
import styles from './styles.module.css';
const { brand, brandImg, brandTitle } = styles;
import { TCategory } from '@types';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useRemoveBrandMutation } from '@store/Brand/brandsApi';
import useRemovingMessage from '@hooks/useRemovingMessage';
import ModalB from '@components/feedback/Modal/ModalB';
const Brand = ({
  _id,
  name,
  image,
  handleEdit,
  showEditAndRemoveIcons,
}: TCategory & {
  handleEdit?: (id: string) => void;
  showEditAndRemoveIcons?: boolean;
}) => {
  const {
    showRemovingMessage,
    setShowRemovingMessage,
    selectedElement,
    handleRemovingMessage,
  } = useRemovingMessage();
  const [
    removeBrand,
    { isLoading: removeBrandLoading, error: removeBrandError },
  ] = useRemoveBrandMutation();
  const handleOnRemove = async () => {
    if (selectedElement) {
      await removeBrand(selectedElement);
      setShowRemovingMessage(false);
    }
  };
  return (
    <div>
      <ModalB
        show={showRemovingMessage}
        title={'Remove Brand'}
        message={`Are you sure you want to remove this Brand`}
        handleClose={() => setShowRemovingMessage(false)}
        handleSave={handleOnRemove}
      />
      <div className={brand} key={_id}>
        <div className={brandImg}>
          <img
            src={image == '' || image === undefined ? emptyImage : image}
            alt={name}
            loading="lazy"
          />
        </div>
        <h4 className={brandTitle}>{name}</h4>
      </div>
      {showEditAndRemoveIcons && (
        <>
          <div className="d-flex justify-content-center mt-5 gap-2">
            {handleEdit && (
              <div
                onClick={() => handleEdit(_id)}
                style={{ cursor: 'pointer' }}
              >
                <FaRegEdit />
              </div>
            )}
            <div
              onClick={() => handleRemovingMessage(_id)}
              style={{ cursor: 'pointer' }}
            >
              {removeBrandLoading ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>
                </>
              ) : (
                <FaRegTrashAlt />
              )}
            </div>
          </div>
          {removeBrandError && <ErrorMessage error={removeBrandError} />}
        </>
      )}
    </div>
  );
};

export default Brand;
