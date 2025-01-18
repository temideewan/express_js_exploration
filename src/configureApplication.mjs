import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { configRouter } from './routes/index.mjs';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { oneHourInMilliseconds } from './utils/constants.mjs';
export default function configureApp() {
  const app = express();
  
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
        mongoUrl: process.env.MONGO_URI,
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  configRouter(app);

  return app;
}
