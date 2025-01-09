import { checkSchema } from 'express-validator';

export const validateGetAllUsers = () => {
  return checkSchema(
    {
      filter: {
        isString: {
          errorMessage: 'filters must not be empty',
        },
        isLength: {
          options: { min: 3, max: 10 },
          errorMessage: 'Length must be between 3 and 10 characters',
        },
      },
      value: {
        custom: {
          options: (_, { req }) => {
            if (!req.query.filter)
              throw new Error("Ensure to set 'filter' property to use value ");
            return true;
          },
        },
        isString: {
          errorMessage: 'Value must be a string',
        },
      },
    },
    ['query']
  );
};
