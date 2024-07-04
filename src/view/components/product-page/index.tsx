import { FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { dispatch } from '../../../store';
import {
  addProductToCompareList,
  getLinkedProducts,
  getProduct,
  removeProductFromCompareList,
} from '../../../store/actions/product-page';
import { ProductCard } from './product-card/product-card';
import {
  compareListSelector,
  linkedProductsSelector,
  productSelector,
} from '../../../store/selectors/product-page';
import { ProductsList } from './products-list';

const ProductPage: FC = () => {
  const { productId = '' } = useParams();

  const product = useSelector(productSelector);
  const compareList = useSelector(compareListSelector);
  const linkedProducts = useSelector(linkedProductsSelector);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getLinkedProducts(productId));
  }, [productId]);
  console.log('Загружена страница товара ', product);

  const handleAddToCompare = useCallback(
    (id: string) => {
      const product = linkedProducts.find((item) => item.id === id);
      if (product) {
        dispatch(addProductToCompareList(product));
      }
    },
    [linkedProducts]
  );

  const handleRemoveFromCompareList = useCallback((id: string) => {
    dispatch(removeProductFromCompareList(id));
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  console.log('comparelist', compareList);

  return (
    <>
      <div>
        <>
          <Link to="/">В список товаров</Link>
          {product && <ProductCard product={product} key={product.id} />}
          <div>
            <span>Сравнение</span>
            {compareList.map((item, index) => (
              <ProductCard
                key={item.id + item.name + index}
                product={item}
                onRemoveFromCompareList={handleRemoveFromCompareList}
              />
            ))}
          </div>
        </>
      </div>
      <ProductsList
        products={linkedProducts}
        addToCompareList={handleAddToCompare}
      />
    </>
  );
};

export default ProductPage;
