import {Router} from 'express'

const router = Router();

router.get('/', (req, res) => {
  console.log(req.signedCookies)
  if(req.signedCookies.hello && req.signedCookies.hello === 'world'){
    return res.send([{ id: 123, name: 'Bread crusts', price: 12.99 }]);
  }

  return res.status(401).send({msg: "Sorry you don't have the right cookies"})
});

export default router;
