import { Button, Form, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import { memo, useMemo } from 'react';
import {
  cartApi,
  useRemoveSpecificCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from '@store/cart/cartApi';
import { useAppDispatch } from '@store/hooks';
const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemComponent = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  color: string;
  product_quantity: number;
  quantity: number;
};

const CartItem = memo(
  ({
    _id,
    title,
    imageCover,
    price,
    color,
    product_quantity,
    quantity,
  }: TCartItemComponent) => {
    const dispatch = useAppDispatch();
    const [
      removeSpecificCartItem,
      { isLoading: removeSpecificCartItemLoading },
    ] = useRemoveSpecificCartItemMutation();

    const [
      updateCartItemQuantity,
      { isLoading: updateCartItemQuantityLoading },
    ] = useUpdateCartItemQuantityMutation();

    const renderOptions = useMemo(
      () =>
        Array(product_quantity)
          .fill(0)
          .map((_, index) => {
            const quantity = ++index;
            return (
              <option value={quantity} key={quantity}>
                {quantity}
              </option>
            );
          }),
      [product_quantity]
    );

    const removeItemHandler = async (_id: string) => {
      dispatch(
        cartApi.util.updateQueryData(
          'getLoggedUserCart',
          undefined,
          (draft) => {
            if (!draft?.data?.cartItems) return;
            draft.data.cartItems = draft.data.cartItems.filter(
              (item) => item._id !== _id
            );
          }
        )
      );
      try {
        await removeSpecificCartItem(_id);
      } catch (err) {
        console.error('cart update failed', err);
        dispatch(cartApi.util.invalidateTags(['cart'])); // Refetch if API fails
      }
    };
    const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (updateCartItemQuantityLoading) return;
      const value = +e.target.value;
      dispatch(
        cartApi.util.updateQueryData(
          'getLoggedUserCart',
          undefined,
          (draft) => {
            if (!draft?.data?.cartItems) return;
            const existingItem = draft.data.cartItems.find(
              (item) => item._id === _id
            );

            if (existingItem) {
              existingItem.quantity = value;
            }
          }
        )
      );
      try {
        updateCartItemQuantity({ _id, quantity: value });
      } catch (err) {
        console.error('cart update failed', err);
        dispatch(cartApi.util.invalidateTags(['cart'])); // Refetch if API fails
      }
    };
    return (
      <div className={cartItem} key={_id}>
        <div className={product}>
          <div className={productImg}>
            <img src={imageCover} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>
              {price} <span style={{ fontSize: '18px' }}>₪</span>
            </h3>
            <h3>{color}</h3>
            <Button
              variant="secondary"
              style={{ color: 'white', width: '100px' }}
              className="mt-auto"
              onClick={() => removeItemHandler(_id)}
            >
              {removeSpecificCartItemLoading ? (
                <Spinner animation="border" size="sm" variant="primary" />
              ) : (
                'Remove'
              )}
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          {updateCartItemQuantityLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : (
            <Form.Select value={quantity ?? 0} onChange={changeQuantity}>
              {renderOptions}
            </Form.Select>
          )}
        </div>
      </div>
    );
  }
);

export default CartItem;
