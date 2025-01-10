import passport from 'passport';
import LocalStrategy from 'passport-local';
import { mockUsers } from '../utils/constants.mjs';

passport.serializeUser((user, done) => {
  console.log("Inside serialize user")
  console.log(user)
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log("Inside deserialize user")
  console.log(`User id ${userId}`)
  try {
    const foundUser = mockUsers.find((user) => user.id === userId);
    if (!foundUser) throw new Error('User not found');

    done(null, foundUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`password: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error('User not found here');
      if (findUser.password !== password)
        throw new Error('Invalid credentials');
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
