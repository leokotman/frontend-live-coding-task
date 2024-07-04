import { RootState } from '..';

export const allProductsSelector = (state: RootState) =>
  state.rootPage.products;
