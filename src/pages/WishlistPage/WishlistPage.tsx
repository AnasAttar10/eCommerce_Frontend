import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import { Product } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import { useAppSelector } from '@store/hooks';
// import { useGetProductsInfoQuery } from '@store/cart/cartApi';
// import { useAppSelector } from '@store/hooks';
import { useGetWishlistItemsQuery } from '@store/wishlist/wishlistApi';
import { Container } from 'react-bootstrap';

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: wishlistItems = { status: '', results: 0, data: [] },
    isLoading: wishlistLoading,
    error: wishlistError,
  } = useGetWishlistItemsQuery(undefined, { skip: user.role === 'admin' });
  const productsWithLike = wishlistItems?.data?.map((p) => ({
    ...p,
    isLiked: true,
  }));

  return (
    <Container>
      <Heading title="Wishlist" />
      <Loading isLoading={wishlistLoading} error={wishlistError} type="product">
        <GridList
          emptyMessage={'Your wishlist is empty'}
          records={productsWithLike ? productsWithLike : []}
          renderRecord={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Wishlist;
