import { body, checkSchema } from 'express-validator';

export default function validateCreateUser() {
  return checkSchema(
    {
      username: {
        isString: {
          errorMessage: 'Username must be a string',
        },
        notEmpty: {
          errorMessage: 'Username cannot be empty',
        },
        isLength: {
          options: {
            min: 5,
            max: 32,
          },
          errorMessage: 'Username must be within 5 and 32 characters long',
        },
      },
      displayname: {
        notEmpty: {
          errorMessage: 'Display name cannot be empty',
        },
      },
    },
    ['body']
  );
}
