import { User } from '../models/user.model.js';

class AuthService {
    async findUser (email) {
       return await User.findOne({email});
    }

    async create (user) {
        return await User.create(user);
    }




};

export const authService = new AuthService();