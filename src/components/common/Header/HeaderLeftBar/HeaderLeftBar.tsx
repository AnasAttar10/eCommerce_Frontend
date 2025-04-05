import HeaderCounter from '../HeaderCounter/HeaderCounter';
import CartLogo from '@assets/svg/cart.svg?react';
import WishlistLogo from '@assets/svg/wishlist.svg?react';
import styles from './styles.module.css';
import { useGetWishlistItemsQuery } from '@store/wishlist/wishlistApi';
import { memo } from 'react';
import { useGetLoggedUserCartQuery } from '@store/cart/cartApi';
import { useAppSelector } from '@store/hooks';
const { headerLeftBar } = styles;
const HeaderLeftBar = memo(() => {
  const { user } = useAppSelector((state) => state.auth);

  const { data: wishlistItems } = useGetWishlistItemsQuery(undefined, {
    skip: !user.email || user.role === 'admin',
  });
  const { data: cartItems } = useGetLoggedUserCartQuery(undefined, {
    skip: !user.email || user.role === 'admin',
  });
  const wishlistTotalquantities = wishlistItems?.results || 0;
  const cartTotalquantities = cartItems?.numOfCartItems || 0;

  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        totalquantities={wishlistTotalquantities}
        title={'Wishlist'}
        logo={<WishlistLogo title="wishlist" />}
        to="/wishlist"
      />
      |
      <HeaderCounter
        totalquantities={cartTotalquantities}
        title={'cart'}
        logo={<CartLogo title="cart" />}
        to="/cart"
      />
    </div>
  );
});

export default HeaderLeftBar;
