import { Router } from "express";
import usersRouter from './user.mjs'
import productsRouter from './products.mjs'

const router = Router();

router.use('/api/users',usersRouter)
router.use('/api/products',productsRouter)

export default router;
