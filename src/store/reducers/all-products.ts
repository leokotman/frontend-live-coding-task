import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../models';
import { getAllProducts } from '../actions/all-products';

type AllProductsState = {
  products: Product[] | undefined;
};

const defaultState: AllProductsState = { products: [] };

export const rootPageSlice = createSlice({
  name: 'root-page',
  initialState: defaultState,
  reducers: {
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});
export const rootPageReducer = rootPageSlice.reducer;
