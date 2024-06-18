import { Product } from "../models/product.model.js";

class ProductService {
     async addProduct (product) {
       return await Product.create(product);
    }

    async findAll (page, size, sort) {
      return await Product.find().sort(sort).skip((page - 1)*size).limit(size);
    }

    async findById (productId) {
      return await Product.findById(productId);
    }

    async update (id, data) {
      return await Product.findByIdAndUpdate(id, data);
    }

    async deleteOne (id) {
      return await Product.findByIdAndDelete(id);
    }
}

export const productService = new ProductService();