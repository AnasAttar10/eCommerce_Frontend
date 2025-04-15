import HeaderCounter from '../HeaderCounter/HeaderCounter';
import CartLogo from '@assets/svg/cart.svg?react';
import WishlistLogo from '@assets/svg/wishlist.svg?react';
import styles from './styles.module.css';
import { memo } from 'react';
import useCartItems from '@hooks/useCartItems';
import useWishlistItems from '@hooks/useWishlistItems';
const { headerLeftBar } = styles;
const HeaderLeftBar = memo(() => {
  const { numOfCartItems } = useCartItems();
  const { numOfWishlistItems } = useWishlistItems();
  const wishlistTotalquantities = numOfWishlistItems || 0;
  const cartTotalquantities = numOfCartItems || 0;

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
