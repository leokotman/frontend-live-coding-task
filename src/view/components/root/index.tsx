import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { allProductsSelector } from '../../../store/selectors/all-products';
import { dispatch } from '../../../store';
import { getAllProducts } from '../../../store/actions/all-products';

export const Root: FC = () => {
  const allProducts = useSelector(allProductsSelector);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [allProducts]);

  if (allProducts === undefined) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <ul>
        {allProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
