import {
  cartApi,
  useAddProductToCartMutation,
  useClearCartMutation,
  useGetLoggedUserCartQuery,
  useRemoveSpecificCartItemMutation,
  useUpdateCartItemQuantityMutation,
} from '@store/cart/cartApi';
import {
  addToCart,
  cartItemChangeQuantity,
  clearCartInStorage,
  removeCartItem,
} from '@store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetProductsQuery } from '@store/Product/productsApi';

const useCartItems = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { items, numOfCartItems } = useAppSelector((state) => state.cart);
  const productsIds = items.map((i) => i.id).join(',');
  const queryString = productsIds;

  const {
    data: productsInStorage,
    isLoading: getProductsInStorageLoading,
    error: getProductsInStorageError,
  } = useGetProductsQuery(`?_id=${queryString}`, {
    skip: user.role === 'admin' || !queryString || Boolean(token),
  });

  const {
    data: products,
    isLoading: getProductsLoading,
    error: getProductsError,
    refetch,
  } = useGetLoggedUserCartQuery(undefined, {
    skip: user.role === 'admin' || !token,
  });

  const [addProductToCart, { isLoading: addProductToCartLoading }] =
    useAddProductToCartMutation();

  const [removeSpecificCartItem, { isLoading: removeSpecificCartItemLoading }] =
    useRemoveSpecificCartItemMutation();

  const [updateCartItemQuantity, { isLoading: updateCartItemQuantityLoading }] =
    useUpdateCartItemQuantityMutation();

  const [clearCart, { isLoading: clearCartLoading }] = useClearCartMutation();

  const cartItems = items.map((i) => {
    const product = productsInStorage?.data.find((p) => p._id === i.id);
    if (product)
      return {
        _id: product._id,
        price:
          product.priceAfterDiscount && product.priceAfterDiscount > 0
            ? product.priceAfterDiscount
            : product.price,
        product: product,
        quantity: i.quantity,
        color: i.color,
      };
  });

  const totalCartPrice = cartItems.reduce(
    (sum, c) => sum + (c?.price as number) * (c?.quantity as number),
    0
  );

  const handleAddToCar = async (_id: string, color?: string) => {
    if (token)
      await addProductToCart({ productId: _id, color: color }).unwrap();
    else dispatch(addToCart({ productId: _id, color: color }));
  };

  const removeItemHandler = async (_id: string, color?: string) => {
    if (token) {
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
    } else dispatch(removeCartItem({ productId: _id, color }));
  };

  const changeQuantity = (
    e: React.ChangeEvent<HTMLSelectElement>,
    _id: string,
    color?: string
  ) => {
    const value = +e.target.value;
    if (token) {
      if (updateCartItemQuantityLoading) return;
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
    } else
      dispatch(
        cartItemChangeQuantity({ productId: _id, quantity: value, color })
      );
  };

  const handleClearCart = async () => {
    if (token) await clearCart();
    else dispatch(clearCartInStorage());
  };

  return {
    cartId: products?.data?._id,
    cartItems: products?.data?.cartItems ?? cartItems,
    totalCartPrice:
      products?.data?.totalPriceAfterDiscount ??
      products?.data?.totalCartPrice ??
      totalCartPrice,
    hasDiscount: Boolean(products?.data?.totalPriceAfterDiscount),
    numOfCartItems: products?.numOfCartItems ?? numOfCartItems,
    getProductsLoading: getProductsLoading ?? getProductsInStorageLoading,
    addProductToCartLoading,
    updateCartItemQuantityLoading,
    removeSpecificCartItemLoading,
    clearCartLoading,
    getProductsError: getProductsError ?? getProductsInStorageError,
    handleAddToCar,
    changeQuantity,
    removeItemHandler,
    handleClearCart,
    refetch,
  };
};
export default useCartItems;
