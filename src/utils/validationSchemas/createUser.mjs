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
      password: {
        notEmpty: {
          errorMessage: 'Password cannot be empty',
        },
        isLength: {
          options: {
            min: 8,
            max: 32,
          },
          errorMessage: 'Password must be between 8 and 32 characters long',
        },
        // matchPasswords: {
        //   custom: (value) =>
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        //       value
        //     ),
        //   errorMessage:
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        // },
      },
    },
    ['body']
  );
}
