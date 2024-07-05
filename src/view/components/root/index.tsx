import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography } from '@mui/material';

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
    <Box component="section">
      <Grid container spacing={2} component="ul">
        {allProducts.map((product) => (
          <Grid
            item
            xs={8}
            key={product.id}
            component="li"
            sx={{ listStyleType: 'none' }}
          >
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Link
                to={`/products/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Typography color="black">{product.name}</Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
