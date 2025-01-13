import passport from 'passport';
import { Strategy } from 'passport-discord';
import DiscordUser from '../mongoose/schemas/discord-user.mjs';

passport.serializeUser((user, done) => {
  console.log(`inside serialize user`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const foundUser = await DiscordUser.findById(userId);
    return foundUser ? done(null, foundUser): done(null, null);
  } catch (error) {
    done(error, null)
  }
});
export default passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
      scope: ['identify', 'email', 'guilds'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('getting here');
      let findUser;
      try {
        findUser = await DiscordUser.findOne({
          discordId: profile.id,
        });
      } catch (error) {
        return done(error, null);
      }
      try {
        if (!findUser) {
          const newUser = new DiscordUser({
            username: profile.username,
            discordId: profile.id,
          });
          await newUser.save();
          console.log(newUser);
          return done(null, newUser);
        }
        console.log(findUser);
        return done(null, findUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
