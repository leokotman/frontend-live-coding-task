import { LinkedProduct, Product, ProductLinkType } from '../models';

export function getMappingProducts(
  productCategoryId: string | undefined,
  products: Product[]
): LinkedProduct[] {
  return products.map((product) => {
    let linkType: ProductLinkType | undefined;

    if (typeof product.category?.id !== 'undefined') {
      linkType = 'related';
    }

    if (productCategoryId === product.category?.id) {
      linkType = 'analog';
    }

    return {
      ...product,
      linkType: linkType,
    };
  });
}
