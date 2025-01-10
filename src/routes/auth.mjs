import { Router } from 'express';
import { mockUsers } from '../utils/constants.mjs';
import passport from 'passport';

const router = Router();

// Without passport
// router.post('/', (req, res) => {
//   const {
//     body: { username, password },
//   } = req;
//   console.log(username, password);
//   const foundUser = mockUsers.find((user) => user.username === username);
//   if (!foundUser || foundUser.password !== password) {
//     return res.status(401).send({ msg: 'BAD CREDENTIALS' });
//   }

//   req.session.user = foundUser;
//   return res.status(200).send(foundUser);
// });
// router.get('/status', (req, res) => {
//   console.log(
//     req.sessionStore.get(req.sessionID, (err, sessionData) => {
//       if (err) {
//         throw err;
//       }
//       console.log(`sessionData`, sessionData);
//     })
//   );
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: 'User not authenticated' });
// });

// with passport
router.post('/', passport.authenticate('local'), (req, res) => {
  res.send({ msg: 'Logged in successfully' });
});

router.get('/status', (req, res) => {
  console.log('Inside /auth/status endpoint');
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post('/logout', (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});
export default router;
