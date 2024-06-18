import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Product.css';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../App.js';

const ProductPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const url = `${API_URL}/products/${id}`;
    axios
      .get(url)
      .then((productResponse) => {
        setIsLoading(false);
        setProduct(productResponse.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        props.onError('Loading the product failed. Please try again later');
      });
  }, [id, props]);

  let content = <p>Is loading...</p>;

  if (!isLoading && product) {
    content = (
      <main className="product-page">
        <h1>{product.name}</h1>
        <h2>{product.price}</h2>
        <div
          className="product-page__image"
          style={{
            backgroundImage: `url('${product.image}')`
          }}
        />
        <p>{product.description}</p>
      </main>
    );
  }
  if (!isLoading && !product) {
    content = (
      <main>
        <p>Found no product. Try again later.</p>
      </main>
    );
  }

  return content;
};

export default ProductPage;
