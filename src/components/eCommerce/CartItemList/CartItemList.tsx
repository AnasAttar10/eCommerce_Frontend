import { TProduct } from '@types';
import CartItem from '../CartItem/CartItem';
import { AppDispatch } from '@store/index';
type TCartItem = {
  _id: string;
  color: string;
  price: number;
  quantity: number;
  product: TProduct;
};

export type TUpdateCartItemQuantity = (params: {
  _id: string;
  quantity: number;
}) => void;

type TCartList = {
  dispatch: AppDispatch;
  cartItems: TCartItem[];
  updateCartItemQuantityLoading: boolean;
  updateCartItemQuantity: TUpdateCartItemQuantity;
};

const CartItemList = ({ cartItems }: TCartList) => {
  const productsInfo =
    cartItems &&
    cartItems?.map((p) => (
      <CartItem
        key={p._id}
        _id={p._id}
        imageCover={p.product.imageCover}
        title={p.product.title}
        product_quantity={p.product.quantity || 0}
        color={p.color}
        price={p.price}
        quantity={p.quantity}
      />
    ));
  return <div>{productsInfo}</div>;
};

export default CartItemList;
