import passport from 'passport';
import LocalStrategy from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';
import User from '../mongoose/schemas/user.js';

passport.serializeUser((user, done) => {
  console.log('Inside serialize user');
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  console.log('Inside deserialize user');
  console.log(`User id ${userId}`);
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
      if (foundUser.password !== password) throw new Error('Bad Credentials');
      done(null, foundUser);
    } catch (error) {
      done(error, null);
    }
  })
);
