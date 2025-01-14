import { mockUsers } from "../utils/constants.mjs";

const getUserByIdController = (req, res) => {
  console.log(req.params);
  const { foundUserIndex } = req;
  const foundUser = mockUsers[foundUserIndex];
  if (!foundUser) {
    return res.status(404).send({ msg: 'User not found.' });
  }

  return res.status(200).send(foundUser);
}


export default getUserByIdController;
