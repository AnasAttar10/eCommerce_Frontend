import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import Product from '@components/eCommerce/Product/Product';
import Loading from '@components/feedback/Loading/Loading';
import FilterForm from '@components/forms/FilterForm';
import { useAppSelector } from '@store/hooks';
import { useGetProductsQuery } from '@store/Product/productsApi';
import { useGetWishlistItemsQuery } from '@store/wishlist/wishlistApi';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SortBy from './SortBy';
import useQueryString from '@hooks/useProductsQueryString';
import useSearchInput from '@hooks/useSearchInput';
import SearchInput from '@components/forms/SearchInput/SearchInput';
const limit = 10;
const Products = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { prefix } = useParams();
  const { searchValue, handleOnSearch } = useSearchInput();
  const {
    handlePageChange,
    handleSelect,
    handleFilterFormChange,
    currentPage,
    stringQueryResult,
    isSendRequest,
  } = useQueryString(limit, prefix, searchValue);

  const {
    error,
    isLoading: productsLoading,
    data: products,
  } = useGetProductsQuery(stringQueryResult, {
    skip: searchValue ? isSendRequest : false,
  });

  const categoryId = products?.data[0]?.category;

  const { data: wishlistItems, isLoading: wishlistLoading } =
    useGetWishlistItemsQuery(undefined, { skip: user.role === 'admin' });

  const wishlistProductsArr = wishlistItems?.data?.map((wi) => wi._id);

  const productsWithLike = products?.data?.map((p) => ({
    ...p,
    isLiked: wishlistProductsArr?.includes(p._id),
  }));

  return (
    <Container>
      <Row>
        <div className="d-flex justify-content-between flex-wrap">
          <Heading title={`Products`} />
          <div className="m-2">
            <SearchInput handleOnSearch={handleOnSearch} />
          </div>

          <div>
            <SortBy handleSelect={handleSelect} />
          </div>
        </div>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={3} xl={2} className="mb-5">
          <FilterForm
            categoryId={categoryId ?? ''}
            handleFilterFormChange={handleFilterFormChange}
            showBrands
            showSubCategories
            showPrice
          />
        </Col>
        <Col xs={12} sm={12} md={12} lg={9} xl={10}>
          <Loading
            isLoading={productsLoading || wishlistLoading}
            error={error}
            type="product"
          >
            <GridList
              emptyMessage={'There Are No Products'}
              records={productsWithLike ? productsWithLike : []}
              renderRecord={(record) => (
                <Product
                  {...record}
                  showQuantity={false}
                  showLikeIcon={user.role !== 'admin'}
                />
              )}
            />
          </Loading>
        </Col>
      </Row>
      <Row>
        <PaginationComponent
          currentPage={currentPage}
          onPageChange={handlePageChange}
          numOfPages={products?.paginationResult?.numOfPages ?? 1}
        />
      </Row>
    </Container>
  );
};

export default Products;
