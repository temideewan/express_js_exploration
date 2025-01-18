import { matchedData } from 'express-validator';
import { mockUsers } from '../utils/constants.mjs';
import { hashPassword } from '../utils/helpers.js';
import User from '../mongoose/schemas/user.js'

export const getUserByIdController = (req, res) => {
  const { foundUserIndex } = req;
  const foundUser = mockUsers[foundUserIndex];
  if (!foundUser) {
    return res.status(404).send({ msg: 'User not found.' });
  }
  return res.send(foundUser);
};

export const createUserController = async (req, res) => {
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
