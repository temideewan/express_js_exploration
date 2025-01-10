import { Router } from 'express';
import usersRouter from './user.mjs';
import productsRouter from './products.mjs';
import cartRouter from './cart.mjs';
import authRouter from './auth.mjs';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/products', productsRouter);
router.use('/api/cart', cartRouter);
router.use('/api/auth', authRouter);

export default router;
