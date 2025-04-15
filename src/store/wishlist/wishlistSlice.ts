import { createSlice } from '@reduxjs/toolkit';

export interface IWishlist {
  wishlist: string[];
  loading: boolean;
  numOfWishlistItems: number;
}
const initialState: IWishlist = {
  wishlist: [],
  loading: false,
  numOfWishlistItems: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlistStorage: (state, action) => {
      const productId = action.payload;
      state.wishlist.push(productId);
      state.numOfWishlistItems++;
    },
    removeFromWishlistStorage: (state, action) => {
      const productId = action.payload;
      const index = state.wishlist.findIndex((w) => w === productId);
      console.log(index);

      if (index > -1) {
        state.wishlist.splice(index, 1);
        state.numOfWishlistItems--;
      }
    },
    clearWishlistInStorage: (state) => {
      state.wishlist = [];
      state.numOfWishlistItems = 0;
    },
  },
});

export const {
  addToWishlistStorage,
  removeFromWishlistStorage,
  clearWishlistInStorage,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
