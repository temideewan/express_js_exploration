import mongoose from 'mongoose'
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import routes from './routes/index.mjs';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import './strategies/local-strategy.mjs';

const app = express();
mongoose.connect('mongodb://localhost:27017/express_tutorial').then(() => {
  console.log('Connected to database')
}).catch(err => {
  console.error(err);
})
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
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    })
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
