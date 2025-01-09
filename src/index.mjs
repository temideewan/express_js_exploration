import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './routes/index.mjs';
import passport from 'passport';
import { mockUsers } from './utils/constants.mjs';

const app = express();
const oneHourInMilliseconds = 60 * 60 * 1000;
app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
  session({
    secret: 'helloworld',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: oneHourInMilliseconds,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  res.cookie('hello', 'world', {
    maxAge: 300000,
    signed: true,
    httpOnly: true,
    secure: true,
    sameSite: true,
  });
  res.status(201).send({ msg: 'Hello, World!' });
});

app.post('/api/auth', (req, res) => {
  const {
    body: { username, password },
  } = req;
  console.log(username, password);
  const foundUser = mockUsers.find((user) => user.username === username);
  if (!foundUser || foundUser.password !== password) {
    return res.status(401).send({ msg: 'BAD CREDENTIALS' });
  }

  req.session.user = foundUser;
  return res.status(200).send(foundUser);
});

app.get('/api/auth/status', (req, res) => {
  console.log(
    req.sessionStore.get(req.sessionID, (err, sessionData) => {
      if (err) {
        throw err;
      }
      console.log(`sessionData`, sessionData);
    })
  );
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: 'User not authenticated' });
});

app.post('/api/cart', (req, res) => {
  console.log(req.session);
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }

  return res.status(201).send(item);
});

app.get('/api/cart', (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { cart } = req.session;
  return res.status(200).send(cart ?? []);
});
