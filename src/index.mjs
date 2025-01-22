import mongoose from 'mongoose';
import 'dotenv/config';
import './strategies/local-strategy.mjs';
import configureApp from './configureApplication.mjs';
// import './strategies/discord-strategy.mjs';
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(err);
  });

const app = configureApp(mongoose);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
