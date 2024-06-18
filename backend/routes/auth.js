import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import { authService } from "../services/auth.service.js";

const router = Router();

const createToken = (data) => {
  return jsonwebtoken.sign({id: data}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
};

router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  try {
    const user = await authService.findUser(email);
    const isPasswordsEqual = await bcrypt.compare(pw, user.password);
    if (!isPasswordsEqual) {
     throw Error;
    }
    const token = createToken(user._id);
    res.status(StatusCodes.OK).json({ token: token, user: { email: user.email } });
  } catch (e) {
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ message: 'Authentication failed, invalid username or password.' });
  }
});

router.post('/signup', async (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  const salt = +process.env.SALT;
  const existingUser = await authService.findUser(email);
  if ( existingUser) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'User already exists.' });
  }
  try {
    const hashedPW = await bcrypt.hash(pw, salt);
    const user = await authService.create({email, password: hashedPW});
    const token = createToken(user._id);
      res
        .status(StatusCodes.CREATED)
        .json({ token, user: { email: user.email} });
      } catch(err) {
      res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Creating the user failed.' });
    };
});

export const authRouter = router;
