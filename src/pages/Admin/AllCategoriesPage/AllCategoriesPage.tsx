import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import GridListAndForm from '@components/common/GridListAndForm/GridListAndForm';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import { Category } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import AddCategoryForm from '@components/forms/Admin/AddCategoryForm';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useEditRecord from '@hooks/useEditRecord';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetCategoriesQuery } from '@store/Category/categoriesApi';
import { Container } from 'react-bootstrap';
const limit = 10;
const AllCategoriesPage = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
  const { handlePageChange, currentPage, stringQueryResult, isSendRequest } =
    useQueryString(limit, undefined, searchValue);
  const { recordId, handleEdit, resetRecordId } = useEditRecord();
  const {
    data: records,
    isLoading,
    error,
  } = useGetCategoriesQuery(stringQueryResult, {
    skip: searchValue ? isSendRequest : false,
  });

  return (
    <div>
      <GridListAndForm
        FormProps={(handleCloseForm) => (
          <AddCategoryForm
            recordId={recordId ? recordId : ''}
            handleCloseForm={handleCloseForm}
          />
        )}
        buttonText="Add New Category "
        recordId={recordId}
        resetRecordId={resetRecordId}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading title="Categories" />
            <div>
              <SearchInput handleOnSearch={handleOnSearch} />
            </div>
          </div>
          <Loading isLoading={isLoading} error={error} type="category">
            <GridList
              emptyMessage={'There Are No Categories'}
              records={records ? records.data : []}
              renderRecord={(record) => (
                <Category
                  {...record}
                  handleEdit={handleEdit}
                  showEditAndRemoveIcons={true}
                />
              )}
            />
          </Loading>
        </Container>
      </GridListAndForm>
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        numOfPages={records?.paginationResult?.numOfPages ?? 1}
      />
    </div>
  );
};

export default AllCategoriesPage;
