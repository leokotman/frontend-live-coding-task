import { FC } from 'react';
import { Product } from '../../../../models';

interface Props {
  product: Product;
  onRemoveFromCompareList?: (id: string) => void;
}

export const ProductCard: FC<Props> = ({
  product,
  onRemoveFromCompareList,
}) => {
  return (
    <div>
      <h3>{product.name}</h3>
      Price {product.price}
      {onRemoveFromCompareList && (
        <button
          onClick={() => {
            onRemoveFromCompareList(product.id);
            console.log('удаление товара из сравнения ', product.id);
          }}
        >
          Remove
        </button>
      )}
    </div>
  );
};
