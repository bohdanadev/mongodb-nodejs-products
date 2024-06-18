import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './EditProduct.css';
import Input from '../../components/Input/Input.js';
import Button from '../../components/Button/Button.js';
import { API_URL } from '../../App.js';

const ProductEditPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const { id, mode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit') {
      axios
        .get(`${API_URL}/products/${id}`)
        .then((productResponse) => {
          const product = productResponse.data;
          setTitle(product.name);
          setPrice(product.price.toString());
          setImageUrl(product.image);
          setDescription(product.description);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [id, mode]);

  const editProductHandler = (event) => {
    event.preventDefault();
    if (title.trim() === '' || price.trim() === '' || imageUrl.trim() === '' || description.trim() === '') {
      return;
    }
    setIsLoading(true);
    const productData = {
      name: title,
      price: parseFloat(price),
      image: imageUrl,
      description: description
    };
    let request;
    if (mode === 'edit') {
      request = axios.patch(`${API_URL}/products/${id}`, productData);
    } else {
      request = axios.post(`${API_URL}/products`, productData);
    }
    request
      .then(() => {
        setIsLoading(false);
        navigate('/products');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        props.onError('Editing or adding the product failed. Please try again later');
      });
  };

  const inputChangeHandler = (event, input) => {
    switch (input) {
      case 'title':
        setTitle(event.target.value);
        break;
      case 'price':
        setPrice(event.target.value);
        break;
      case 'imageUrl':
        setImageUrl(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  };

  let content = (
    <form className="edit-product__form" onSubmit={editProductHandler}>
      <Input
        label="Title"
        config={{ type: 'text', value: title }}
        onChange={(event) => inputChangeHandler(event, 'title')}
      />
      <Input
        label="Price"
        config={{ type: 'number', value: price }}
        onChange={(event) => inputChangeHandler(event, 'price')}
      />
      <Input
        label="Image URL"
        config={{ type: 'text', value: imageUrl }}
        onChange={(event) => inputChangeHandler(event, 'imageUrl')}
      />
      <Input
        label="Description"
        elType="textarea"
        config={{ rows: '5', value: description }}
        onChange={(event) => inputChangeHandler(event, 'description')}
      />
      <Button type="submit">
        {mode === 'add' ? 'Create Product' : 'Update Product'}
      </Button>
    </form>
  );

  if (isLoading) {
    content = <p>Is loading...</p>;
  }

  return <main>{content}</main>;
};

export default ProductEditPage;
