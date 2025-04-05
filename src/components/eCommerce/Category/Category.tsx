import { Link } from 'react-router-dom';
import emptyImage from '@assets/svg/emptyimage.svg';
import styles from './styles.module.css';
const { category, categoryImg, categoryTitle } = styles;
import { TCategory } from '@types';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useRemoveCategoryMutation } from '@store/Category/categoriesApi';
import ModalB from '@components/feedback/Modal/ModalB';
import useRemovingMessage from '@hooks/useRemovingMessage';
const Category = ({
  _id,
  name,
  slug,
  image,
  handleEdit,
  showEditAndRemoveIcons = false,
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
    removeCategory,
    { isLoading: removeCategoryLoading, error: removeCategoryError },
  ] = useRemoveCategoryMutation();
  const handleOnRemove = async () => {
    if (selectedElement) {
      await removeCategory(selectedElement);
      setShowRemovingMessage(false);
    }
  };
  return (
    <div>
      <ModalB
        show={showRemovingMessage}
        title={'Remove Category'}
        message={`Are you sure you want to remove this category`}
        handleClose={() => setShowRemovingMessage(false)}
        handleSave={handleOnRemove}
      />
      <div className={category} key={_id}>
        <Link to={`/categories/products/${slug}`}>
          <div className={categoryImg}>
            <img
              src={image == '' || image === undefined ? emptyImage : image}
              alt={name}
              loading="lazy"
            />
          </div>
          <h4 className={categoryTitle}>{name}</h4>
        </Link>
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
              {removeCategoryLoading ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>
                </>
              ) : (
                <FaRegTrashAlt />
              )}
            </div>
          </div>
          {removeCategoryError && <ErrorMessage error={removeCategoryError} />}
        </>
      )}
    </div>
  );
};

export default Category;
