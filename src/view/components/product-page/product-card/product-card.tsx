import { FC } from 'react';
import { Product } from '../../../../models';
import { Button, Card, CardContent } from '@mui/material';

interface Props {
  product: Product;
  onRemoveFromCompareList?: (id: string) => void;
}

export const ProductCard: FC<Props> = ({
  product,
  onRemoveFromCompareList,
}) => {
  return (
    <Card>
      <CardContent>
        <h3>{product.name}</h3>
        Цена: {product.price}
        {onRemoveFromCompareList && (
          <Button
            onClick={() => {
              onRemoveFromCompareList(product.id);
              console.log('Удаление товара из сравнения ', product.id);
            }}
            variant="contained"
          >
            Удалить
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
