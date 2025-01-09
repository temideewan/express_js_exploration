import passport from 'passport';
import LocalStrategy from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';

passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error('User not found');
      if (findUser.password !== password)
        throw new Error('Invalid credentials');
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
