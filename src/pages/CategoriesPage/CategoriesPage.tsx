import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import Category from '@components/eCommerce/Category/Category';
import Loading from '@components/feedback/Loading/Loading';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import { useGetCategoriesQuery } from '@store/Category/categoriesApi';
import { Container, Row } from 'react-bootstrap';
const limit = 10;
const Categories = () => {
  const { searchValue, handleOnSearch } = useSearchInput();
  const { handlePageChange, currentPage, stringQueryResult, isSendRequest } =
    useQueryString(limit, undefined, searchValue);
  const {
    data: records,
    isLoading,
    error,
  } = useGetCategoriesQuery(stringQueryResult, {
    skip: isSendRequest,
  });
  return (
    <Container>
      <Row>
        <div className="d-flex justify-content-between">
          <Heading title={`Categories`} />
          <div>
            <SearchInput handleOnSearch={handleOnSearch} />
          </div>
        </div>
      </Row>
      <Loading isLoading={isLoading} error={error} type="category">
        <GridList
          emptyMessage={'There Are No Categories'}
          records={records ? records.data : []}
          renderRecord={(record) => <Category {...record} />}
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

export default Categories;
