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
      Цена: {product.price}
      {onRemoveFromCompareList && (
        <button
          onClick={() => {
            onRemoveFromCompareList(product.id);
            console.log('Удаление товара из сравнения ', product.id);
          }}
        >
          Удалить
        </button>
      )}
    </div>
  );
};
