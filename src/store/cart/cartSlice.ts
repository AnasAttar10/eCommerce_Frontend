import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@types';

export interface ICart {
  // items: { [key: string]: { productId: string; quantity: number }[] };
  items: { [key: string]: { [key: string]: number } };
  productsFullInfo: IProduct[];
}
const initialState: ICart = {
  items: {},
  productsFullInfo: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const { userId, productId } = action.payload;
      if (userId in state.items) {
        if (productId in state.items[userId]) state.items[userId][productId]++;
        else state.items[userId][productId] = 1;
      } else {
        state.items[userId] = { [productId]: 1 };
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.userId][action.payload.id] =
        action.payload.quantity;
    },
    removeCartItem: (state, action) => {
      delete state.items[action.payload.userId][action.payload.id];
    },
    clearCart: (state, action) => {
      console.log(action);

      state.items[action.payload] = {};
    },
  },
});
export const isArrivedMax = createSelector(
  [
    (state) => state.cart.items,
    (_state, userId) => userId,
    (_state, _userId, productId) => productId,
    (_state, _userId, _productId, max) => max,
  ],
  (items, userId, prductId, max) => {
    return items[userId] ? items[userId][prductId] === max : false;
  }
);
export const getCartTotalQuantity = createSelector(
  [(state) => state.cart.items, (_state, id) => id],
  (items: ICart, id: keyof ICart) => {
    const totalQuantity = Object.values(items[id] ? items[id] : []).reduce(
      (init, currentValue) => {
        return init + currentValue;
      },
      0
    );
    return totalQuantity;
  }
);
export const { addCart, cartItemChangeQuantity, removeCartItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
