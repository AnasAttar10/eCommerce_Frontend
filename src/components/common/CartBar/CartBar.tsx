import { CartItemList } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import ModalB from '@components/feedback/Modal/ModalB';
import useCartItems from '@hooks/useCartItems';
import { TCartItem } from '@types';
import { useState } from 'react';

const CartBar = () => {
  const [showCartItems, setShowCartItems] = useState(false);
  const {
    cartItems,
    numOfCartItems,
    totalCartPrice,
    getProductsLoading,
    getProductsError,
  } = useCartItems();
  return (
    <>
      <ModalB
        show={showCartItems}
        title={'Your Order'}
        message={
          <Loading isLoading={getProductsLoading} error={getProductsError}>
            <h4 style={{ textAlign: 'center' }}>
              {totalCartPrice.toFixed(2)}{' '}
              <span style={{ fontSize: '18px' }}>₪</span>
            </h4>
            <hr />
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
        }
        handleClose={() => setShowCartItems(false)}
        showButtons={false}
      />
      {numOfCartItems > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#0D6EFD',
            textAlign: 'center',
            padding: '5px 0',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => setShowCartItems(true)}
        >
          You have {numOfCartItems} items in your cart –{' '}
          {totalCartPrice.toFixed(2)}₪ total. View now
        </div>
      )}
    </>
  );
};

export default CartBar;
