import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { productPageReducer } from './reducers/product-page';
import { rootPageReducer } from './reducers/all-products';

export const rootReducer = combineReducers({
  productPage: productPageReducer,
  rootPage: rootPageReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const preloadedState: Partial<RootState> = {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});
export const dispatch = store.dispatch;
