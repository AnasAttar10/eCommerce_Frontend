import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import ModalB from '@components/feedback/Modal/ModalB';
import useRemovingMessage from '@hooks/useRemovingMessage';
import { useRemoveSubCategoryMutation } from '@store/SubCategories/subCategoriesApi';
import { TSubCategory } from '@types';
import { Spinner } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const SubCategory = ({
  _id,
  name,
  showEditAndRemoveIcons = false,
  handleEdit,
}: TSubCategory & {
  showEditAndRemoveIcons?: boolean;
  handleEdit?: (id: string) => void;
}) => {
  const {
    showRemovingMessage,
    setShowRemovingMessage,
    selectedElement,
    handleRemovingMessage,
  } = useRemovingMessage();

  const [
    removeSubCategory,
    { isLoading: removeSubCategoryLoading, error: removeSubCategoryError },
  ] = useRemoveSubCategoryMutation();

  const handleOnRemove = async () => {
    if (selectedElement) {
      await removeSubCategory(selectedElement);
      setShowRemovingMessage(false);
    }
  };
  return (
    <div>
      <ModalB
        show={showRemovingMessage}
        title={'Remove subCategory'}
        message={`Are you sure you want to remove this subCategory`}
        handleClose={() => setShowRemovingMessage(false)}
        handleSave={handleOnRemove}
      />
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '10px',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        {name}
      </div>
      {showEditAndRemoveIcons && (
        <>
          <div className="d-flex justify-content-center mt-1 gap-2">
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
              {removeSubCategoryLoading ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>
                </>
              ) : (
                <FaRegTrashAlt />
              )}
            </div>
          </div>
          {removeSubCategoryError && (
            <ErrorMessage error={removeSubCategoryError} />
          )}
        </>
      )}
    </div>
  );
};

export default SubCategory;
