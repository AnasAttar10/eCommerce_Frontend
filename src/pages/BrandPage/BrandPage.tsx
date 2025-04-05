import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import Brand from '@components/eCommerce/Brand/Brand';
import Loading from '@components/feedback/Loading/Loading';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetBrandsQuery } from '@store/Brand/brandsApi';
import { Container, Row } from 'react-bootstrap';
const limit = 10;
const Brands = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
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
    <Container>
      <Row>
        <div className="d-flex justify-content-between">
          <Heading title={`Brands`} />
          <div>
            <SearchInput handleOnSearch={handleOnSearch} />
          </div>
        </div>
      </Row>
      <Loading isLoading={isLoading} error={error} type="brand">
        <GridList
          emptyMessage={'There Are No Brands'}
          records={records ? records.data : []}
          renderRecord={(record) => <Brand {...record} />}
        />
      </Loading>
      <Row>
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={handlePageChange}
          numOfPages={records?.paginationResult?.numOfPages ?? 1}
        />
      </Row>
    </Container>
  );
};

export default Brands;
