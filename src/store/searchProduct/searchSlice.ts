import { createSlice } from '@reduxjs/toolkit';

export type TSearchSlice = {
  productName: string;
};

const initialState = {
  productName: undefined,
};
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.productName = action.payload;
    },
  },
});
export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
