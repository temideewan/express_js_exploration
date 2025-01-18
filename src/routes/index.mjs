import { Router } from 'express';
import usersRouter from './user.mjs';
import productsRouter from './products.mjs';
import cartRouter from './cart.mjs';
import authRouter from './auth.mjs';

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/auth', authRouter);

export const configRouter = (expressApp) => {
  expressApp.use('/api',router);
}
