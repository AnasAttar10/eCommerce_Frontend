import { createSlice } from '@reduxjs/toolkit';
export interface ICart {
  items: { id: string; quantity: number; color: string }[];
  loading: boolean;
  numOfCartItems: number;
}
const initialState: ICart = {
  items: [],
  loading: false,
  numOfCartItems: 0,
};

const findIndex = (
  items: { id: string; quantity: number; color?: string }[],
  productId: string,
  color?: string
) => {
  return items.findIndex((i) => {
    if (!color) return i.id === productId && !i.color;
    return i.id === productId && i.color === color;
  });
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, color } = action.payload;
      const index = findIndex(state.items, productId, color);
      if (index > -1) {
        const quantity = state.items[index].quantity + 1;
        state.items[index] = {
          id: productId,
          quantity: quantity,
          color: color,
        };
      } else {
        state.items.push({ id: productId, quantity: 1, color: color });
        state.numOfCartItems++;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      const { productId, quantity, color } = action.payload;
      const index = findIndex(state.items, productId, color);
      state.items[index] = {
        id: productId,
        quantity,
        color: state.items[index]?.color,
      };
    },
    removeCartItem: (state, action) => {
      const { productId, color } = action.payload;
      const index = findIndex(state.items, productId, color);
      state.items.splice(index, 1);
      state.numOfCartItems--;
    },
    clearCartInStorage: (state) => {
      state.items = [];
      state.numOfCartItems = 0;
    },
  },
});
export const {
  addToCart,
  cartItemChangeQuantity,
  removeCartItem,
  clearCartInStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
