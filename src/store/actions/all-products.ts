import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MockAllProductsGateway } from '../../gateways/all-products';
import { IAllProductsPageRepository } from '../../services/products/interfaces';
import { Product } from '../../models';

const API: IAllProductsPageRepository = new MockAllProductsGateway();

export const getAllProducts = createAsyncThunk(
  'root-page/get-all-products',
  async () => {
    const response = await API.getAllProducts();
    return response;
  }
);

export const setAllProducts = createAction<Product[]>(
  'root-page/set-all-products'
);
