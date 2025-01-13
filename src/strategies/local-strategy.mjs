import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../mongoose/schemas/user.js';
import { comparePasswords } from '../utils/helpers.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new Error('User not found');
    done(null, foundUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username });
      if (!foundUser) throw new Error('User not found');
      if (!comparePasswords(password, foundUser.password))
        throw new Error('Bad Credentials');
      done(null, foundUser);
    } catch (error) {
      done(error, null);
    }
  })
);
