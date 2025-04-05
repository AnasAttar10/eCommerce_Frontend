import.meta.env;
import { Heading } from '@components/common';
import { CartItemList, CartSubtotal } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import { LottieHandler } from '@components/feedback';
import {
  useClearCartMutation,
  useGetLoggedUserCartQuery,
  useUpdateCartItemQuantityMutation,
} from '@store/cart/cartApi';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useCallback, useEffect, useState } from 'react';
import ModalB from '@components/feedback/Modal/ModalB';
import ApplyCoupon from '@components/eCommerce/Coupon/ApplyCoupon';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import {
  useAddCashOrderMutation,
  useAddCheckoutSessionMutation,
} from '@store/order/orderApi';
import { TAddress } from '@types';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { loadStripe } from '@stripe/stripe-js';
import useRemovingMessage from '@hooks/useRemovingMessage';
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from '@stripe/react-stripe-js';
// const STRIPE_KEY =
//   'pk_test_51QjiXhISmsQsoRB1581rgF1olzsnZ2V1UvZzuVoqPDYUoffmng23UksaMLSjkAqEDFJJ6LxoChMKQNhHy5454O4d00bSeiepHd';
const Cart = () => {
  const [show, setShow] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<TAddress | undefined>(
    undefined
  );
  const { showRemovingMessage, setShowRemovingMessage, handleRemovingMessage } =
    useRemovingMessage();
  const { user, token } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const {
    data: products,
    isLoading: getProductsLoading,
    error: getProductsError,
    refetch,
  } = useGetLoggedUserCartQuery(undefined, { skip: user.role === 'admin' });
  const [
    addCashOrder,
    {
      isLoading: addCashOrderLoading,
      error: addCashOrderError,
      isSuccess: addCashOrderSuccess,
    },
  ] = useAddCashOrderMutation();
  const [addCheckoutSession, { error: checkoutError }] =
    useAddCheckoutSessionMutation();
  const [updateCartItemQuantity, { isLoading: updateCartItemQuantityLoading }] =
    useUpdateCartItemQuantityMutation();
  const [clearCart, { isLoading: clearCartLoading }] = useClearCartMutation();

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleAddOrder = () => {
    setShow(true);
  };
  const handleCheckout = async () => {
    if (products?.data && selectedAddress) {
      try {
        const stripePromise = await loadStripe(
          import.meta.env.VITE_STRIPE_KEY as string
        );
        if (!stripePromise) throw new Error('Failed to initialize Stripe.');
        const response = await addCheckoutSession({
          cartId: products?.data?._id,
          shippingAddress: selectedAddress,
        }).unwrap();

        if (!response.session?.id) {
          throw new Error('Session ID is missing in the response.');
        }
        if (response?.session.id)
          await stripePromise?.redirectToCheckout({
            sessionId: response?.session.id,
          });
      } catch (error) {
        console.error('Checkout error:', error);
      }
    }
  };
  const handleSave = async () => {
    if (products?.data && selectedAddress)
      await addCashOrder({
        cartId: products?.data?._id,
        shippingAddress: selectedAddress,
      });
    setShow(false);
  };

  const handleRefetchData = useCallback(() => {
    refetch();
  }, [refetch]);

  const getSelectedAddress = useCallback((address: TAddress) => {
    setSelectedAddress(address);
  }, []);
  const handleOnRemove = async () => {
    await handleClearCart();
    setShowRemovingMessage(false);
  };
  useEffect(() => {
    if (addCashOrderSuccess) refetch();
  }, [refetch, addCashOrderSuccess]);
  return (
    <Container>
      <ModalB
        show={show}
        title={'Placing Order'}
        message={`Are you sure you want to place order with subTotal : ${
          products?.data?.totalPriceAfterDiscount ??
          products?.data?.totalCartPrice ??
          0
        }`}
        handleClose={() => setShow(false)}
        handleSave={handleSave}
      />
      <ModalB
        show={showRemovingMessage}
        title={'Clear Cart'}
        message={`Are you sure you want to clear the cart`}
        handleClose={() => setShowRemovingMessage(false)}
        handleSave={handleOnRemove}
      />
      <Row>
        <Col md={products && products?.numOfCartItems > 0 ? 8 : 12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <Heading title="Cart" />
            {products && products?.numOfCartItems > 0 && (
              <Button
                variant="secondary"
                style={{ color: 'white', width: '200px' }}
                className="mt-auto"
                onClick={() => handleRemovingMessage(undefined)}
              >
                {clearCartLoading ? (
                  <>
                    <Spinner animation="border" size="sm"></Spinner> Loading ...
                  </>
                ) : (
                  'Clear Cart '
                )}
              </Button>
            )}
          </div>
          <Loading
            isLoading={getProductsLoading}
            error={getProductsError}
            type="cart"
          >
            {clearCartLoading || (products && products.numOfCartItems > 0) ? (
              <CartItemList
                dispatch={dispatch}
                cartItems={products?.data.cartItems ?? []}
                updateCartItemQuantity={updateCartItemQuantity}
                updateCartItemQuantityLoading={updateCartItemQuantityLoading}
              />
            ) : addCashOrderSuccess ? (
              <LottieHandler
                type="success"
                message="Your order has been placed successfully"
              />
            ) : (
              <LottieHandler type="empty" message="Your cart is empty" />
            )}
          </Loading>
        </Col>
        {products && !getProductsLoading && products?.numOfCartItems > 0 && (
          <Col md={4}>
            <ApplyCoupon handleRefetchData={handleRefetchData} />
            <CartSubtotal
              hasDiscount={
                products?.data?.totalPriceAfterDiscount ? true : false
              }
              subTotal={
                products?.data?.totalPriceAfterDiscount ??
                products?.data?.totalCartPrice ??
                0
              }
              token={token}
              handleAddOrder={handleAddOrder}
              handleCheckout={handleCheckout}
              getSelectedAddress={getSelectedAddress}
              addCashOrderLoading={addCashOrderLoading}
            />
          </Col>
        )}
        {addCashOrderError && <ErrorMessage error={addCashOrderError} />}
        {checkoutError && <ErrorMessage error={checkoutError} />}
      </Row>
    </Container>
  );
};

export default Cart;
