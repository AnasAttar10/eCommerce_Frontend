import.meta.env;
import { Heading } from '@components/common';
import { CartItemList, CartSubtotal } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import { LottieHandler } from '@components/feedback';
import { useAppSelector } from '@store/hooks';
import { useCallback, useEffect, useState } from 'react';
import ModalB from '@components/feedback/Modal/ModalB';
import ApplyCoupon from '@components/eCommerce/Coupon/ApplyCoupon';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import {
  useAddCashOrderMutation,
  useAddCheckoutSessionMutation,
} from '@store/order/orderApi';
import { TAddress, TCartItem } from '@types';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { loadStripe } from '@stripe/stripe-js';
import useRemovingMessage from '@hooks/useRemovingMessage';
import useCartItems from '@hooks/useCartItems';
import { useNavigate } from 'react-router-dom';
import { useGetLoggedUserAddressesQuery } from '@store/address/addressApi';

const Cart = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<TAddress | undefined>(
    undefined
  );
  const [showAddressForm, setShowAddressForm] = useState(false);
  const { showRemovingMessage, setShowRemovingMessage, handleRemovingMessage } =
    useRemovingMessage();
  const { token } = useAppSelector((state) => state.auth);
  const {
    cartId,
    cartItems,
    numOfCartItems,
    totalCartPrice,
    hasDiscount,
    getProductsError,
    getProductsLoading,
    handleClearCart,
    clearCartLoading,
    refetch,
  } = useCartItems();
  const {
    data: addresses,
    isLoading: getAddressesLoading,
    error: getAddressesError,
  } = useGetLoggedUserAddressesQuery(undefined, {
    skip: !token,
  });
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

  const handleShowAddressForm = (status: boolean) => {
    setShowAddressForm(status);
  };

  const handleAddOrder = () => {
    if (!token) navigate('/auth/login');
    if (token && !selectedAddress) handleShowAddressForm(true);
    else {
      setShow(true);
    }
  };

  const handleCheckout = async () => {
    if (!token) navigate('/auth/login');
    if (token && !selectedAddress) handleShowAddressForm(true);
    if (cartItems && selectedAddress && cartId) {
      try {
        const stripePromise = await loadStripe(
          import.meta.env.VITE_STRIPE_KEY as string
        );
        if (!stripePromise) throw new Error('Failed to initialize Stripe.');

        const response = await addCheckoutSession({
          cartId: cartId,
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
    if (cartItems && selectedAddress && cartId)
      await addCashOrder({
        cartId: cartId,
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

  const handleOnRemove = () => {
    handleClearCart();
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
          totalCartPrice ?? 0
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
        <Col md={numOfCartItems > 0 ? 8 : 12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <Heading title="Cart" />
            {numOfCartItems > 0 && (
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
            {clearCartLoading || numOfCartItems > 0 ? (
              <CartItemList
                cartItems={
                  Array.isArray(cartItems)
                    ? cartItems.filter(
                        (item): item is TCartItem => item !== undefined
                      )
                    : []
                }
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
        {!getProductsLoading && numOfCartItems > 0 && (
          <Col md={4}>
            <ApplyCoupon handleRefetchData={handleRefetchData} />
            <CartSubtotal
              hasDiscount={hasDiscount}
              subTotal={totalCartPrice ?? 0}
              addresses={addresses?.data ?? []}
              getAddressesLoading={getAddressesLoading}
              getAddressesError={getAddressesError}
              showAddressForm={showAddressForm}
              handleShowAddressForm={handleShowAddressForm}
              getSelectedAddress={getSelectedAddress}
              handleAddOrder={handleAddOrder}
              handleCheckout={handleCheckout}
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
