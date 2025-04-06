import Loading from '@components/feedback/Loading/Loading';
import { useGetProductQuery } from '@store/Product/productsApi';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { useAddProductToCartMutation } from '@store/cart/cartApi';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import ReviewForm from '@components/forms/ReviewForm';
import { useGetProductReviewsQuery } from '@store/review/reviewsApi';
import GridList from '@components/common/GridList/GridList';
import Review from '@components/eCommerce/Review/Review';
import useEditRecord from '@hooks/useEditRecord';
import { TReview } from '@types';
import { Heading } from '@components/common';
import useQueryString from '@hooks/useProductsQueryString';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
const {
  imagesContainer,
  imageCoverWrapper,
  imagesWrapper,
  imageWrapper,
  image,
  productInformationContainer,
  category,
  descriptionWrapper,
  reviewsContainer,
  myReviewWrapper,
} = styles;
const limit = 5;
const ProductPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const [showForm, setShowForm] = useState(true);
  const [myReview, setMyReview] = useState<TReview>();
  const { recordId, handleEdit, resetRecordId } = useEditRecord();
  const [currentColor, setCurrentColor] = useState<string | undefined>(
    undefined
  );
  const { data, isLoading, error } = useGetProductQuery(id as string, {
    skip: !id,
  });
  const quantity = data?.data.quantity || 0;
  const isMax = quantity <= 0;
  const [addProductToCart, { isLoading: addProductToCartLoading }] =
    useAddProductToCartMutation();
  const { handlePageChange, currentPage, stringQueryResult } = useQueryString(
    limit,
    undefined
  );

  const {
    data: records,
    isLoading: getReviewsLoading,
    error: getReviewsError,
  } = useGetProductReviewsQuery(
    { productId: id as string, queryString: stringQueryResult },
    {
      skip: !id,
    }
  );
  const handleAddToCar = async () => {
    console.log(id);

    if (id && currentColor)
      await addProductToCart({ productId: id, color: currentColor });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetRecordId();
  };
  useEffect(() => {
    if (records) {
      const myReview = records.data.find((d) => d.user._id === user._id);
      if (myReview) setMyReview(myReview);
    }
  }, [records, user._id, setMyReview]);

  useEffect(() => {
    if (myReview && !recordId) setShowForm(false);
  }, [recordId, myReview]);

  return (
    <Container className="overflow-hidden">
      <Loading isLoading={isLoading} error={error} type="productPage">
        <Row className="w-100 p-2">
          <Col md={6} className="mb-3">
            <div className={imagesContainer}>
              <div className={imageCoverWrapper}>
                <img src={data?.data.imageCover} />
              </div>
              <div className={imagesWrapper}>
                {data?.data.images?.map((i, idx) => (
                  <div key={idx} className={imageWrapper}>
                    <img className={image} src={i} alt={`slide${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={productInformationContainer}>
              <h2>{data?.data.title}</h2>
              <p className={category}>{data?.data.category?.name}</p>
              <div style={{ display: 'flex', gap: '5px' }}>
                {Number(data?.data.priceAfterDiscount) > 1 && (
                  <h3>
                    {data?.data?.priceAfterDiscount}
                    <span style={{ fontSize: '18px' }}>₪</span>
                  </h3>
                )}
                {data?.data.price && (
                  <h3>
                    <span
                      style={{
                        textDecoration: data?.data?.priceAfterDiscount
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {data?.data?.price}
                    </span>
                    <span style={{ fontSize: '18px' }}>₪</span>
                  </h3>
                )}
              </div>
              <p></p>
              <h4>Quantity : {data?.data.quantity}</h4>
              <p></p>
              {user.role === 'admin' && <h4>sold : {data?.data.sold}</h4>}
              <div
                style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
              >
                {data?.data.colors && data?.data.colors?.length > 0 && (
                  <span style={{ fontWeight: 'bold' }}>Colors :</span>
                )}
                {data?.data.colors?.map((c) => (
                  <p
                    key={Math.random()}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: c,
                      borderRadius: '50%',
                      width: c === currentColor ? '70px' : '50px',
                      height: c === currentColor ? '70px' : '50px',
                    }}
                    onClick={() => setCurrentColor(c)}
                  ></p>
                ))}
              </div>
              <h4>Description</h4>
              <p className={descriptionWrapper}>{data?.data.description}</p>
              {user.role != 'admin' && (
                <Button
                  variant="info"
                  style={{ color: 'white', width: '100%' }}
                  onClick={() => handleAddToCar()}
                  disabled={addProductToCartLoading || isMax}
                >
                  {addProductToCartLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Loading ...{' '}
                    </>
                  ) : (
                    'Add to cart'
                  )}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Loading>
      <hr />
      <Row>
        <Heading title="Reviews" />
        {showForm && (
          <ReviewForm
            productId={data?.data._id ?? ''}
            recordId={recordId ?? ''}
            handleCloseForm={handleCloseForm}
          />
        )}

        <div className={reviewsContainer}>
          {myReview && !showForm && (
            <div className={myReviewWrapper}>
              <Review
                {...myReview}
                handleEdit={handleEdit}
                showForm={() => setShowForm(true)}
                showEditAndRemoveIcons
              />
            </div>
          )}
          <hr />
          <Loading
            isLoading={getReviewsLoading}
            error={getReviewsError}
            type="review"
          >
            <GridList
              emptyMessage={'There Are No Reviews'}
              records={
                records?.data
                  ? records.data.filter(
                      (d) => d.user._id !== myReview?.user._id
                    )
                  : []
              }
              renderRecord={(record) => <Review {...record} />}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
            />
          </Loading>
        </div>
      </Row>
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        numOfPages={records?.paginationResult?.numOfPages ?? 1}
      />
    </Container>
  );
};

export default ProductPage;
