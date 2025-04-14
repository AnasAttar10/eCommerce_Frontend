import { TProduct } from '@types';
import CartItem from '../CartItem/CartItem';
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
  cartItems: TCartItem[];
  isAside?: boolean;
};

const CartItemList = ({ cartItems, isAside = false }: TCartList) => {
  const productsInfo =
    cartItems &&
    cartItems?.map((p) => (
      <CartItem
        key={`${p._id}${p.color ? p.color : 'color'}`}
        _id={p._id}
        imageCover={p.product.imageCover}
        title={p.product.title}
        product_quantity={p.product.quantity || 0}
        color={p.color}
        price={
          p.product.priceAfterDiscount && p.product.priceAfterDiscount > 0
            ? p.product.priceAfterDiscount
            : p.price
        }
        quantity={p.quantity}
        isAside={isAside}
      />
    ));
  return <div>{productsInfo}</div>;
};

export default CartItemList;
