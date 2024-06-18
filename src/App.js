import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header.js';
import Modal from './components/Modal/Modal.js';
import Backdrop from './components/Backdrop/Backdrop.js';
import ProductsPage from './pages/Product/Products.js';
import ProductPage from './pages/Product/Product.js';
import EditProductPage from './pages/Product/EditProduct.js';
import AuthPage from './pages/Auth/Auth.js';
import { StatusCodes } from 'http-status-codes';

export const API_URL = 'http://localhost:3100';

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [error, setError] = useState(null);

  const logoutHandler = () => {
    setIsAuth(false);
  };

  const authHandler = (event, authData) => {
    event.preventDefault();
    if (authData.email.trim() === '' || authData.password.trim() === '') {
      return;
    }
    let request;
    if (authMode === 'login') {
      request = axios.post(`${API_URL}/login`, authData);
    } else {
      request = axios.post(`${API_URL}/signup`, authData);
    }
    request
      .then(authResponse => {
        if (authResponse.status === StatusCodes.CREATED || authResponse.status === StatusCodes.OK) {
          const token = authResponse.data.token;
          console.log(token);
          setIsAuth(true);
        }
      })
      .catch(err => {
        errorHandler(err.response.data.message);
        console.log(err);
        setIsAuth(false);
      });
  };

  const authModeChangedHandler = () => {
    setAuthMode(prevAuthMode => (prevAuthMode === 'login' ? 'signup' : 'login'));
  };

  const errorHandler = message => {
    setError(message);
  };

  let routes = (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/auth" element={<Navigate to="/products" replace />} />
      <Route path="/signup" element={<Navigate to="/products" replace />} />
      <Route
        path="/product/:mode"
        element={<EditProductPage onError={errorHandler} />}
      />
      <Route
        path="/products/:id/:mode"
        element={<EditProductPage onError={errorHandler} />}
      />
      <Route
        path="/products/:id"
        element={<ProductPage onError={errorHandler} />}
      />
      <Route
        path="/products"
        element={<ProductsPage onError={errorHandler} />}
      />
    </Routes>
  );

  if (!isAuth) {
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/products" element={<Navigate to="/auth" replace />} />
        <Route path="/product" element={<Navigate to="/auth" replace />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              mode={authMode}
              onAuth={authHandler}
              onAuthModeChange={authModeChangedHandler}
            />
          }
        />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Modal open={!!error} title="An Error Occurred" onClose={() => errorHandler(null)}>
        <p>{error}</p>
      </Modal>
      <Backdrop show={!!error} />
      <Header authenticated={isAuth} onLogout={logoutHandler} />
      {routes}
    </div>
  );
};

export default App;
