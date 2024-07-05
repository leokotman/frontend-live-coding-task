import { FC, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

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
import { ProductsList } from './products-list/products-list';

const ProductPage: FC = () => {
  const { productId = '' } = useParams();

  const product = useSelector(productSelector);
  const compareList = useSelector(compareListSelector);
  const linkedProducts = useSelector(linkedProductsSelector);

  useEffect(() => {
    dispatch(getProduct(productId));
    dispatch(getLinkedProducts(productId));
  }, [productId]);

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
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Box component="section" gap={2}>
      <Grid container gap={1} component="section">
        <Grid item xs={6} component="article">
          <Button variant="outlined">
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              В список товаров
            </Link>
          </Button>
          <Paper elevation={1} sx={{ marginTop: 1 }}>
            {product && <ProductCard product={product} key={product.id} />}
          </Paper>
        </Grid>
        <Grid item xs={5} container component="article" gap={1}>
          <Typography width="100%">Сравнение</Typography>
          {compareList.map((item, index) => (
            <Grid item key={item.id + item.name + index}>
              <Paper elevation={1}>
                <ProductCard
                  product={item}
                  onRemoveFromCompareList={handleRemoveFromCompareList}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <ProductsList
        products={linkedProducts}
        addToCompareList={handleAddToCompare}
      />
    </Box>
  );
};

export default ProductPage;
