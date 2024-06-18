import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Products from '../../components/Products/Products.js';
import { API_URL } from '../../App.js';


const ProductsPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios
      .get(`${API_URL}/products`)
      .then((productsResponse) => {
        setIsLoading(false);
        setProducts(productsResponse.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setProducts([]);
        props.onError('Loading products failed. Please try again later');
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, [props]);

  const productDeleteHandler = (productId) => {
    axios
      .delete(`${API_URL}/products/${productId}`)
      .then((result) => {
        console.log(result);
        fetchData();

      })
      .catch((err) => {
        props.onError('Deleting the product failed. Please try again later');
        console.log(err);
      });
  };

  let content = <p>Loading products...</p>;

  if (!isLoading && products.length > 0) {
    content = <Products products={products} onDeleteProduct={productDeleteHandler} />;
  }
  if (!isLoading && products.length === 0) {
    content = <p>Found no products. Try again later.</p>;
  }

  return <main>{content}</main>;
};

export default ProductsPage;

