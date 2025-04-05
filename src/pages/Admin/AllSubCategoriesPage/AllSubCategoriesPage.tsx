import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import GridListAndForm from '@components/common/GridListAndForm/GridListAndForm';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import SubCategory from '@components/eCommerce/SubCategory/SubCategory';
import Loading from '@components/feedback/Loading/Loading';
import AddSubCategoryForm from '@components/forms/Admin/AddSubCategoryForm';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useEditRecord from '@hooks/useEditRecord';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetAllSubCategoriesQuery } from '@store/SubCategories/subCategoriesApi';
import { Container } from 'react-bootstrap';
const limit = 10;
const AllSubCategoriesPage = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
  const { handlePageChange, currentPage, stringQueryResult, isSendRequest } =
    useQueryString(limit, undefined, searchValue);
  const { recordId, handleEdit, resetRecordId } = useEditRecord();
  const {
    data: records,
    isLoading,
    error,
  } = useGetAllSubCategoriesQuery(stringQueryResult, { skip: isSendRequest });
  return (
    <div>
      <GridListAndForm
        FormProps={(handleCloseForm) => (
          <AddSubCategoryForm
            recordId={recordId ? recordId : ''}
            handleCloseForm={handleCloseForm}
          />
        )}
        buttonText="Add New Subcategory "
        recordId={recordId}
        resetRecordId={resetRecordId}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading title="SubCategories" />
            <div>
              <SearchInput handleOnSearch={handleOnSearch} />
            </div>
          </div>
          <Loading isLoading={isLoading} error={error} type="category">
            <GridList
              emptyMessage={'There Are No SubCategories'}
              records={records ? records.data : []}
              renderRecord={(record) => (
                <SubCategory
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

export default AllSubCategoriesPage;
