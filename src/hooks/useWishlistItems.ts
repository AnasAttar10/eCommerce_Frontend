import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetProductsQuery } from '@store/Product/productsApi';
import {
  useAddToWishlistMutation,
  useGetWishlistItemsQuery,
  useRemoveFromWishlistMutation,
  wishlistApi,
} from '@store/wishlist/wishlistApi';
import {
  addToWishlistStorage,
  removeFromWishlistStorage,
} from '@store/wishlist/wishlistSlice';

const useWishlistItems = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { wishlist, numOfWishlistItems } = useAppSelector(
    (state) => state.wishlist
  );
  const productsIds = wishlist.map((i) => i).join(',');
  const queryString = productsIds;

  const {
    data: productsInServer,
    isLoading: getProductsInStorageLoading,
    error: getProductsInStorageError,
  } = useGetProductsQuery(`?_id=${queryString}`, {
    skip: user.role === 'admin' || !queryString || Boolean(token),
  });

  const {
    data: wishlistProductsInServer,
    isLoading: getWishlistLoading,
    error: getWishlistError,
  } = useGetWishlistItemsQuery(undefined, {
    skip: user.role === 'admin' || !token,
  });

  const [addToWishlist, { isLoading: addProductToWishlistLoading }] =
    useAddToWishlistMutation();

  const [removeFromWishlist, { isLoading: removeFromWishlistLoading }] =
    useRemoveFromWishlistMutation();

  const wishlistProductsIds = token
    ? wishlistProductsInServer?.data?.map((wi) => wi._id)
    : wishlist;

  const handleLikeToggle = async (_id: string, isLiked: boolean) => {
    if (addProductToWishlistLoading || removeFromWishlistLoading) return;
    dispatch(
      wishlistApi.util.updateQueryData(
        'getWishlistItems',
        undefined,
        (draft) => {
          if (!draft?.data) return;
          if (isLiked) {
            draft.data = draft.data.filter(
              (item: { _id: string }) => item._id !== _id
            );
          } else {
            draft.data.push({
              _id,
              title: '',
              description: '',
              quantity: 0,
              price: 0,
              imageCover: '',
              category: '',
            });
          }
        }
      )
    );

    try {
      if (isLiked) {
        if (token) await removeFromWishlist(_id).unwrap();
        else dispatch(removeFromWishlistStorage(_id));
      } else {
        if (token) await addToWishlist(_id).unwrap();
        else dispatch(addToWishlistStorage(_id));
      }
    } catch (error) {
      console.error('Wishlist update failed', error);
      dispatch(wishlistApi.util.invalidateTags(['wishlist']));
    }
  };

  const checkIfTheProductInWishlist = (id: string) => {
    if (wishlistProductsIds?.includes(id)) return true;
    else return false;
  };

  return {
    wishlistProductsIds,
    wishlistItems: wishlistProductsInServer ?? productsInServer,
    numOfWishlistItems: wishlistProductsInServer?.results ?? numOfWishlistItems,
    getWishlistLoading: getWishlistLoading ?? getProductsInStorageLoading,
    addProductToWishlistLoading,
    removeFromWishlistLoading,
    getWishlistError: getWishlistError ?? getProductsInStorageError,
    handleLikeToggle,
    checkIfTheProductInWishlist,
  };
};
export default useWishlistItems;
