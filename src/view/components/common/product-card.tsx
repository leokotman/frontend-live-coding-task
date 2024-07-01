import React, { FC } from 'react';
import { Product } from '../../../models';
import { useDispatch } from 'react-redux';
import { addProductToCompareList } from '../../../store/actions/product-page';

interface Props {
  product: Product;
  onAddToCompare?: (product: Product) => void;
}

export const ProductCard: FC<Props> = ({ product, onAddToCompare }) => {
  const dispatch = useDispatch();

  const handleAddToCompare = () => {
    if (onAddToCompare) {
      onAddToCompare(product);
    } else {
      dispatch(addProductToCompareList(product));
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        width: '200px',
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCompare}>Add to Compare</button>
    </div>
  );
};
