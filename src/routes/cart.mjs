import { Router } from "express";
const router = Router();
router.post('/', (req, res) => {
  console.log(req.session);
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }

  return res.status(201).send(item);
});

router.get('/', (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { cart } = req.session;
  return res.status(200).send(cart ?? []);
});

export default router;
