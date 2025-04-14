import { CartItemList } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import useCartItems from '@hooks/useCartItems';
import { TCartItem } from '@types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Aside = () => {
  const {
    cartItems,
    totalCartPrice,
    getProductsLoading,
    getProductsError,
    numOfCartItems,
  } = useCartItems();

  return (
    <>
      {numOfCartItems > 0 && (
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
            <Button
              variant="outline-secondary"
              size="sm"
              style={{ width: '100%' }}
            >
              Go To Cart
            </Button>
          </Link>

          <h4 style={{ textAlign: 'center' }}>
            {totalCartPrice.toFixed(2)}{' '}
            <span style={{ fontSize: '18px' }}>₪</span>
          </h4>
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
      )}
    </>
  );
};

export default Aside;
