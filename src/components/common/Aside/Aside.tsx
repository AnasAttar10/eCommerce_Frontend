import { CartItemList } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import { useAppSelector } from '@store/hooks';
import { useGetProductsQuery } from '@store/Product/productsApi';
import { TCartItem } from '@types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Aside = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.cart);

  const productsIds = items.map((i) => i.id).join(',');
  const queryString = productsIds;
  const {
    data: products,
    isLoading: getProductsLoading,
    error: getProductsError,
    // refetch,
  } = useGetProductsQuery(`?_id=${queryString}`, {
    skip: user.role === 'admin' || !queryString,
  });

  const cartItems = items.map((i) => {
    const product = products?.data.find((p) => p._id === i.id);
    if (product)
      return {
        _id: product._id,
        price:
          product.priceAfterDiscount && product.priceAfterDiscount > 0
            ? product.priceAfterDiscount
            : product.price,
        product: product,
        quantity: i.quantity,
        color: i.color,
      };
  });

  return (
    <aside
      style={{
        width: '300px',
        background: '#f8f8f8',
        padding: '1rem',
        borderLeft: '1px solid #ddd',
        maxHeight: '100vh',
        overflow: 'auto',
        position: 'sticky',
        top: 0,
      }}
    >
      <h3 style={{ textAlign: 'center' }}>Your Order</h3>
      <Link to="/cart">
        <Button variant="outline-secondary" size="sm" style={{ width: '100%' }}>
          Go To Cart
        </Button>
      </Link>
      <p></p>
      <Loading isLoading={getProductsLoading} error={getProductsError}>
        <CartItemList
          cartItems={
            Array.isArray(cartItems)
              ? cartItems.filter(
                  (item): item is TCartItem => item !== undefined
                )
              : []
          }
          isAside
        />
      </Loading>
    </aside>
  );
};

export default Aside;
