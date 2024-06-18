import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        image: String,
    },
    {
        timestamps: true,
        versionKey: false,
      },
);

export const Product = mongoose.model('Product', productSchema);