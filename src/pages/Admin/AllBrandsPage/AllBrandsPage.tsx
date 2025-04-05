import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import GridListAndForm from '@components/common/GridListAndForm/GridListAndForm';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import Brand from '@components/eCommerce/Brand/Brand';
import Loading from '@components/feedback/Loading/Loading';
import AddBrandForm from '@components/forms/Admin/AddBrandForm';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useEditRecord from '@hooks/useEditRecord';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetBrandsQuery } from '@store/Brand/brandsApi';
// import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
const limit = 10;
const AllBrandsPage = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
  const { recordId, handleEdit, resetRecordId } = useEditRecord();
  const { handlePageChange, currentPage, stringQueryResult, isSendRequest } =
    useQueryString(limit, undefined, searchValue);
  const {
    data: records,
    isLoading,
    error,
  } = useGetBrandsQuery(stringQueryResult, {
    skip: isSendRequest,
  });
  return (
    <div>
      <GridListAndForm
        FormProps={(handleCloseForm) => (
          <AddBrandForm
            handleCloseForm={handleCloseForm}
            recordId={recordId ?? ''}
          />
        )}
        buttonText="Add New Brand "
        recordId={recordId}
        resetRecordId={resetRecordId}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading title="Brands" />
            <div>
              <SearchInput handleOnSearch={handleOnSearch} />
            </div>
          </div>
          <Loading isLoading={isLoading} error={error} type="brand">
            <GridList
              emptyMessage={'There Are No Brands'}
              records={records ? records.data : []}
              renderRecord={(record) => (
                <Brand
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

export default AllBrandsPage;
