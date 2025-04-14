import { Button, Form, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import { memo, useMemo } from 'react';
import useCartItems from '@hooks/useCartItems';
const { cartItem, product, productImg, productImgInAside, productInfo } =
  styles;

type TCartItemComponent = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  color: string;
  product_quantity: number;
  quantity: number;
  isAside?: boolean;
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
    isAside = false,
  }: TCartItemComponent) => {
    const {
      changeQuantity,
      removeItemHandler,
      updateCartItemQuantityLoading,
      removeSpecificCartItemLoading,
    } = useCartItems();

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

    return (
      <div className={cartItem} key={_id}>
        <div className={product}>
          <div className={isAside ? productImgInAside : productImg}>
            <img src={imageCover} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>
              {price} <span style={{ fontSize: '18px' }}>₪</span>
            </h3>
            {color && (
              <div className="d-flex gap-2">
                <span>color :</span>
                <span
                  style={{
                    width: '25px',
                    height: '25px',
                    backgroundColor: color,
                    borderRadius: '50%',
                  }}
                ></span>
              </div>
            )}
            <div className="mb-2">
              <span className="d-block mb-1">Quantity</span>

              <div style={{ width: '80px' }}>
                {updateCartItemQuantityLoading ? (
                  <Spinner animation="border" size="sm" variant="primary" />
                ) : (
                  <Form.Select
                    value={quantity ?? 0}
                    onChange={(e) => changeQuantity(e, _id)}
                  >
                    {renderOptions}
                  </Form.Select>
                )}
              </div>
            </div>
            <Button
              variant="secondary"
              style={{ color: 'white', width: isAside ? '80px' : '100px' }}
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
      </div>
    );
  }
);

export default CartItem;
