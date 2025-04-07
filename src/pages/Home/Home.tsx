import { Button, Carousel, Container } from 'react-bootstrap';
import Adv1 from '@assets/images/image.jpg';
import Adv2 from '@assets/images/image2.png';
import Adv3 from '@assets/images/image3.jpg';
import Adv4 from '@assets/images/image4.png';
import Loading from '@components/feedback/Loading/Loading';
import GridList from '@components/common/GridList/GridList';
import { useGetProductsQuery } from '@store/Product/productsApi';
import { useGetBrandsQuery } from '@store/Brand/brandsApi';
import { useGetCategoriesQuery } from '@store/Category/categoriesApi';
import { Category, Product } from '@components/eCommerce';
import Brand from '@components/eCommerce/Brand/Brand';
import { Link } from 'react-router-dom';
const advertisements = [Adv1, Adv2, Adv3, Adv4];
const queryString = '?page=1&limit=4';
const queryStringForBestSelling = '?page=1&limit=4&sort=-sold';
const Home = () => {
  const {
    data: categories,
    isLoading: getCategoriesLoading,
    error: getCategoriesError,
  } = useGetCategoriesQuery(queryString);
  const {
    data: products,
    isLoading: getProductsLoading,
    error: getProductsError,
  } = useGetProductsQuery(queryString);
  const {
    data: productsB,
    isLoading: getProductsLoadingB,
    error: getProductsErrorB,
  } = useGetProductsQuery(queryStringForBestSelling);
  const {
    data: brands,
    isLoading: getBrandsLoading,
    error: getBrandsError,
  } = useGetBrandsQuery(queryString);
  return (
    <div>
      <div className="slider-section mb-5">
        <Carousel interval={3000}>
          {advertisements.map((a, idx) => (
            <Carousel.Item key={idx}>
              <div style={{ width: '100%', height: '100vh' }}>
                <img
                  className="d-block w-100 h-100"
                  src={a}
                  alt={idx + 'slide'}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="my-5">Featured Categories</h2>
          <Link to="/categories" className="my-5">
            <Button variant="outline-secondary" size="lg">
              More
            </Button>
          </Link>
        </div>
        <Loading
          isLoading={getCategoriesLoading}
          error={getCategoriesError}
          type="category"
        >
          <GridList
            emptyMessage={'There Are No Categories'}
            records={categories ? categories.data : []}
            renderRecord={(record) => <Category {...record} />}
          />
        </Loading>
      </Container>

      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="my-5">Featured Products</h2>
          <Link to="/products" className="my-5">
            <Button variant="outline-secondary" size="lg">
              More
            </Button>
          </Link>
        </div>
        <Loading
          isLoading={getProductsLoading}
          error={getProductsError}
          type="product"
        >
          <GridList
            emptyMessage={'There Are No Categories'}
            records={products ? products.data : []}
            renderRecord={(record) => (
              <Product {...record} showButton={false} showLikeIcon={false} />
            )}
          />
        </Loading>
      </Container>

      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="my-5">Best Selling Products</h2>
          <Link to="/products" className="my-5">
            <Button variant="outline-secondary" size="lg">
              More
            </Button>
          </Link>
        </div>

        <Loading
          isLoading={getProductsLoadingB}
          error={getProductsErrorB}
          type="product"
        >
          <GridList
            emptyMessage={'There Are No Categories'}
            records={productsB ? productsB.data : []}
            renderRecord={(record) => (
              <Product {...record} showButton={false} showLikeIcon={false} />
            )}
          />
        </Loading>
      </Container>

      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className="my-5">Featured Brands</h2>
          <Link to="/brands" className="my-5">
            <Button variant="outline-secondary" size="lg">
              More
            </Button>
          </Link>
        </div>

        <Loading
          isLoading={getBrandsLoading}
          error={getBrandsError}
          type="brand"
        >
          <GridList
            emptyMessage={'There Are No Categories'}
            records={brands ? brands.data : []}
            renderRecord={(record) => <Brand {...record} />}
          />
        </Loading>
      </Container>
      <div
        className="promo-banner text-center text-white py-5"
        style={{ backgroundColor: '#343a40' }}
      >
        <h2>Special Offer: 20% off all orders!</h2>
        <Link to="/categories">
          <Button variant="success" size="lg">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
