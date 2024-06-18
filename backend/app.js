import dotenv from 'dotenv';
import express from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

import { authRouter } from './routes/auth.js';
import { productsRouter } from './routes/products.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/products', productsRouter);
app.use('/', authRouter);

app.listen(process.env.PORT, process.env.HOST, async () => {
  await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'));
  console.log(`Server is running at http://${process.env.HOST}:${process.env.PORT}/`);
});
