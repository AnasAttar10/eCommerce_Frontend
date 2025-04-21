import { Heading } from '@components/common';
import GridList from '@components/common/GridList/GridList';
import { Product } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import useWishlistItems from '@hooks/useWishlistItems';
import { Container } from 'react-bootstrap';

const Wishlist = () => {
  const {
    wishlistItems,
    isWishlistEmpty,
    getWishlistLoading,
    getWishlistError,
  } = useWishlistItems();
  const productsWithLike = !isWishlistEmpty
    ? wishlistItems?.data?.map((p) => ({
        ...p,
        isLiked: true,
      }))
    : [];

  return (
    <Container>
      <Heading title="Wishlist" />
      <Loading
        isLoading={getWishlistLoading}
        error={getWishlistError}
        type="product"
      >
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
