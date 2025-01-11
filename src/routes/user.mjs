import { Router } from 'express';
import { matchedData, query, validationResult } from 'express-validator';
import { mockUsers } from '../utils/constants.mjs';
import validateCreateUser from '../utils/validationSchemas/createUser.mjs';
import { errorFormatter } from '../utils/errorFormatters.mjs';
import { catchValidationErrors, resolveIndexByUserId } from '../utils/middlewares.mjs';
import { validateGetAllUsers } from '../utils/validationSchemas/getAllUsers.mjs';
import User from '../mongoose/schemas/user.js';
const router = Router();
router.get(
  '/',
  validateGetAllUsers(),
  catchValidationErrors,
  (req, res) => {
    console.log(`session ${req.session}`);
    console.log(`sessionID ${req.sessionID}`);
    console.log(
      req.sessionStore.get(req.sessionID, (err, sessionData) => {
        if (err) {
          throw err;
        }
        console.log(`sessionData`, sessionData);
      })
    );
    const {
      query: { filter, value },
    } = req;

    if (filter && value) {
      console.log('has filter  and value');
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    }
    return res.send(mockUsers);
  }
);

router.get('/:id', resolveIndexByUserId, (req, res) => {
  console.log(req.params);
  const { foundUserIndex } = req;
  const foundUser = mockUsers[foundUserIndex];
  if (!foundUser) {
    return res.status(404).send({ msg: 'User not found.' });
  }

  return res.status(200).send(foundUser);
});

router.post('/', validateCreateUser(), catchValidationErrors, async (req, res) => {
  const data = matchedData(req);
  const newUser = new User(data)
  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400)
  }
});

router.put('/:id', resolveIndexByUserId, (req, res) => {
  const { body, foundUserIndex } = req;
  mockUsers[foundUserIndex] = { id: mockUsers[foundUserIndex].id, ...body };
  return res.status(200).send(mockUsers[foundUserIndex]);
});

router.patch('/:id', resolveIndexByUserId, (req, res) => {
  const { body, foundUserIndex } = req;
  console.log(mockUsers[foundUserIndex]);
  mockUsers[foundUserIndex] = { ...mockUsers[foundUserIndex], ...body };
  return res.status(200).send(mockUsers[foundUserIndex]);
});

router.delete('/:id', resolveIndexByUserId, (req, res) => {
  const { foundUserIndex } = req;
  mockUsers.splice(foundUserIndex, 1);
  return res.sendStatus(204);
});

export default router;
