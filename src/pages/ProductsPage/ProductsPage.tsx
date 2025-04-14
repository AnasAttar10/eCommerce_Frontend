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
const limit = 10;
const Products = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const { productName } = useAppSelector((state) => state.search);
  const { prefix } = useParams();
  const {
    handlePageChange,
    handleSelect,
    handleFilterFormChange,
    currentPage,
    stringQueryResult,
    isSendRequest,
  } = useQueryString(limit, prefix, productName);

  const {
    error,
    isLoading: productsLoading,
    data: products,
  } = useGetProductsQuery(stringQueryResult, {
    skip: productName ? isSendRequest : false,
  });

  const categoryId = prefix ? products?.data[0]?.category : undefined;

  const { data: wishlistItems, isLoading: wishlistLoading } =
    useGetWishlistItemsQuery(undefined, {
      skip: user.role === 'admin' || !token,
    });

  const wishlistProductsArr = wishlistItems?.data?.map((wi) => wi._id);

  const productsWithLike = products?.data?.map((p) => ({
    ...p,
    isLiked: wishlistProductsArr?.includes(p._id),
  }));

  return (
    <Container>
      <Row>
        <div className="d-flex flex-wrap flex-column flex-md-row justify-content-between gap-2">
          <Heading title={`Products`} />
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
            showSubCategories={prefix ? true : false}
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
              xl={6}
              lg={6}
              xxl={4}
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
