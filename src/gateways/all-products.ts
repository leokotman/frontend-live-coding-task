import { Product } from '../models';
import { IAllProductsPageRepository } from '../services/products/interfaces';
import { products } from './api';

export class MockAllProductsGateway implements IAllProductsPageRepository {
  async getAllProducts(): Promise<Product[]> {
    return Promise.resolve(products);
  }
}
