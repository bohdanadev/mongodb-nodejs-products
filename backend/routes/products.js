import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { Decimal128, ObjectId } from "mongodb";

import { productService } from '../services/products.service.js';

const router = Router();

router.get('/', async (req, res, next) => {
  const page = req.query.page ?? 1;
  const size = req.query.size ?? 5;
  const sort = req.query.sort ?? {price: -1};
  
  const products = await productService.findAll(page, size, sort);
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  const product = await productService.findById(new ObjectId(req.params.id));
  res.json(product);
});

router.post('', async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()),
    image: req.body.image
  };
  const product = await productService.addProduct(newProduct);

  res
  .status(StatusCodes.CREATED)
  .json({ message: 'Product added', productId: product._id });
});

router.patch('/:id', async (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()),
    image: req.body.image
  };

  const product = await productService.update(new ObjectId(req.params.id), updatedProduct);
  
  res
  .status(StatusCodes.OK)
  .json({ message: 'Product updated', productId: product._id });
});

router.delete('/:id', async (req, res, next) => {
  await productService.deleteOne(new ObjectId(req.params.id));
  res
  .status(StatusCodes.OK)
  .json({ message: 'Product deleted' });
});

export const productsRouter = router;
