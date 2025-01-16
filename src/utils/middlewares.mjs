import { validationResult } from 'express-validator';
import { mockUsers } from './constants.mjs';
import { errorFormatter } from './errorFormatters.mjs';

export const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  const foundUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (foundUserIndex === -1) {
    return res.sendStatus(404);
  }
  req.foundUserIndex = foundUserIndex;
  next();
};

export const catchValidationErrors = (req, res, next) => {
  const result = validationResult(req)
  const isEmpty = !result.isEmpty();
  console.log(isEmpty);
  if (isEmpty) {
    return res.status(400).send({ errors: result.array().map(errorFormatter) });
  }
  next();
};
