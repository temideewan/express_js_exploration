import { Router } from 'express';
import { mockUsers } from '../utils/constants.mjs';
import validateCreateUser from '../utils/validationSchemas/createUser.mjs';
import {
  catchValidationErrors,
  resolveIndexByUserId,
} from '../utils/middlewares.mjs';
import { validateGetAllUsers } from '../utils/validationSchemas/getAllUsers.mjs';
import { createUserController, getUserByIdController } from '../controllers/users.mjs';
const router = Router();
router.get('/', validateGetAllUsers(), catchValidationErrors, (req, res) => {
  req.sessionStore.get(req.sessionID, (err, sessionData) => {
    if (err) {
      throw err;
    }
  });
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  return res.send(mockUsers);
});

router.get('/:id', resolveIndexByUserId, getUserByIdController);

router.post('/', validateCreateUser(), catchValidationErrors, createUserController);

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
