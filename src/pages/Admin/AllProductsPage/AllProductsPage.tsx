import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import GridListAndForm from '@components/common/GridListAndForm/GridListAndForm';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import { Product } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import AddProductForm from '@components/forms/Admin/AddProductForm';
import FilterForm from '@components/forms/FilterForm';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useEditRecord from '@hooks/useEditRecord';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetProductsQuery } from '@store/Product/productsApi';
import { Col, Container } from 'react-bootstrap';
const limit = 10;
const AllProductsPage = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
  const { recordId, handleEdit, resetRecordId } = useEditRecord();
  const {
    handlePageChange,
    handleFilterFormChange,
    currentPage,
    stringQueryResult,
    isSendRequest,
  } = useQueryString(limit, undefined, searchValue);
  const {
    data: records,
    isLoading,
    error,
  } = useGetProductsQuery(stringQueryResult, {
    skip: searchValue ? isSendRequest : false,
  });
  const categoryId = records?.data[0]?.category;
  return (
    <div>
      <GridListAndForm
        FormProps={(handleCloseForm) => (
          <AddProductForm
            recordId={recordId ? recordId : ''}
            handleCloseForm={handleCloseForm}
          />
        )}
        buttonText="Add New Product "
        recordId={recordId}
        resetRecordId={resetRecordId}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading title="Products" />
            <div>
              <SearchInput handleOnSearch={handleOnSearch} />
            </div>
          </div>
          <Col xs={12} sm={12} md={12} lg={12} className="mb-5">
            <FilterForm
              categoryId={categoryId ?? ''}
              handleFilterFormChange={handleFilterFormChange}
              showBrands
              showSubCategories
              showPrice
            />
          </Col>
          <Loading isLoading={isLoading} error={error} type="product">
            <GridList
              emptyMessage={'There Are No Products'}
              records={records ? records.data : []}
              renderRecord={(record) => (
                <Product
                  {...record}
                  showLikeIcon={false}
                  showButton={false}
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

export default AllProductsPage;
