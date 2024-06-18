import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
       
    },
    {
        timestamps: true,
        versionKey: false,
      },
);

export const User = mongoose.model('User', userSchema);