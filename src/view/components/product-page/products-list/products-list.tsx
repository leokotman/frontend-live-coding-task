import { memo, useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { LinkedProduct } from '../../../../models';
import { Modal } from '../../common/modal';
import { ProductCard } from '../product-card/product-card';
import { useLessThenMediaQuery } from '../../../hooks/media-query';

interface ProductsListProps {
  products: LinkedProduct[];
  addToCompareList: (id: string) => void;
}

const PRODUCT_TYPES = {
  analog: 'Аналог',
  related: 'Сопутствующий товар',
};

export const ProductsList = memo((props: ProductsListProps) => {
  const { products = [], addToCompareList } = props;
  const history = window.history;
  const [productToShow, setProductToShow] = useState<LinkedProduct | null>(
    null
  );

  const handleItemClick = useCallback(
    (item: LinkedProduct) => {
      if (item.linkType === 'analog') {
        console.log('Добавление в сравнение товара');
        addToCompareList(item.id);
      } else {
        console.log('Открытые модального окна с товаром: ', item);
        setProductToShow(item);
      }
    },
    [addToCompareList]
  );

  const handleModalClose = useCallback(() => {
    console.log('Закрытие модального окна');
    setProductToShow(() => null);
  }, []);

  const isMobile = useLessThenMediaQuery(450);

  useEffect(() => {
    if (isMobile) {
      history.pushState({}, '');
      window.onpopstate = function (event) {
        if (event.state) {
          console.log('Закрытие модального окна с товаром: ', productToShow);
          setProductToShow(() => null);
        } else {
          history.pushState({}, '', window.location.href);
        }
      };
    }
  }, [isMobile, history, productToShow]);

  return (
    <Box p={2} component="section">
      <ul>
        {products.map((item) => {
          return (
            <li key={item.id}>
              {item.linkType && PRODUCT_TYPES[item.linkType]}:{' '}
              <Button onClick={() => handleItemClick(item)} variant="outlined">
                {item.name}
              </Button>
            </li>
          );
        })}
      </ul>

      <Modal isOpen={Boolean(productToShow)} onClose={handleModalClose}>
        {productToShow && <ProductCard product={productToShow} />}
      </Modal>
    </Box>
  );
});
