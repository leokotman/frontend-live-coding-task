import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Product } from '../../../models';
import { addProductToCompareList } from '../../../store/actions/product-page';
import { Modal } from '../common/modal';
import { ProductCard } from '../common/product-card';

const ProductPage: FC = () => {
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) => state.productPage.product);
  const linkedProducts = useSelector(
    (state: RootState) => state.productPage.linkedProducts
  );
  const comparingProducts = useSelector(
    (state: RootState) => state.productPage.comparingProducts
  );
  const [showModal, setShowModal] = useState(false);

  const handleAddToCompare = (product: Product) => {
    dispatch(addProductToCompareList(product));
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>

      <button onClick={openModal}>View Product Details</button>

      {linkedProducts && (
        <div>
          <h2>Linked Products</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {linkedProducts.map((linkedProduct) => (
              <ProductCard
                key={linkedProduct.id}
                product={linkedProduct}
                onAddToCompare={handleAddToCompare}
              />
            ))}
          </div>
        </div>
      )}

      <Modal onClose={closeModal} isOpen={showModal}>
        <h2>Product Details</h2>
        <p>Name: {product.name}</p>
        <p>Price: ${product.price}</p>
      </Modal>

      {comparingProducts && comparingProducts.length > 0 && (
        <div>
          <h2>Comparing Products</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {comparingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
