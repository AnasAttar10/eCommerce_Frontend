import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import GridListAndForm from '@components/common/GridListAndForm/GridListAndForm';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import Coupon from '@components/eCommerce/Coupon/Coupon';
import Loading from '@components/feedback/Loading/Loading';
import AddCouponForm from '@components/forms/Admin/AddCouponForm';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useEditRecord from '@hooks/useEditRecord';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetCouponsQuery } from '@store/coupon/couponApi';
import { Container } from 'react-bootstrap';
const limit = 10;
const AllCouponsPage = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
  const { handlePageChange, currentPage, stringQueryResult, isSendRequest } =
    useQueryString(limit, undefined, searchValue);
  const {
    data: records,
    isLoading,
    error,
  } = useGetCouponsQuery(stringQueryResult, { skip: isSendRequest });

  const { recordId, handleEdit, resetRecordId } = useEditRecord();

  return (
    <div>
      <GridListAndForm
        FormProps={(handleCloseForm) => (
          <AddCouponForm
            recordId={recordId ? recordId : ''}
            handleCloseForm={handleCloseForm}
          />
        )}
        buttonText="Add New Coupon "
        recordId={recordId}
        resetRecordId={resetRecordId}
      >
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Heading title="Coupons" />
            <div>
              <SearchInput handleOnSearch={handleOnSearch} />
            </div>
          </div>
          <Loading isLoading={isLoading} error={error} type="coupon">
            <GridList
              emptyMessage={'There Are No Coupons'}
              records={records ? records.data : []}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={6}
              renderRecord={(record) => (
                <Coupon
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

export default AllCouponsPage;
